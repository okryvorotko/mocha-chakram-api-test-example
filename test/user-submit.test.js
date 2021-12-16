const api = require("../connectors/apiConnector");
const chakram = require('chakram');
const expect = chakram.expect;
const monocle = require('monocle-js');
const users = require('../data/users');

describe('Creating new user tests', () => {
    it('should return unauthorized on user submit', (done) => {
        monocle.run(function* () {
            // Initialize test data
            let adminUser; // No admin user here since access to signIn is not provided
            const newUser = JSON.parse(JSON.stringify(users.newUser));

            // Authorize and get cookies/token here

            // Submit
            const response = yield api.post(adminUser, newUser, 'signup/super');
            expect(response).to.have.status(401);
            expect(response).to.have.json('auth_url', function (url) {
                expect(url).to.contain("https://dev-tracker-iq.auth.us-east-2.amazoncognito.com/oauth2/authorize");
            });
            done();
        });
    });

    it('should submit new user', (done) => {
        monocle.run(function* () {
            // Initialize test data
            let adminUser; // No admin user here since access to signIn is not provided
            const newUser = JSON.parse(JSON.stringify(users.newUser));

            // Authorize and get cookies/token here

            // Submit
            const signupSuperResponse = yield api.post(adminUser, newUser, 'signup/super');
            // We skip checking response for this test because it will fail since authentication not provided
            // expect(signupSuperResponse).to.have.status(200);

            // Get users list
            let accountsSuperResponse = yield api.get(adminUser, 'accounts/super');

            expect(accountsSuperResponse).to.have.json('content.json.rows', function (content) {
                expect(content).to.contain(JSON.stringify(newUser));
            });
            done();
        });
    }).timeout(10000);
});