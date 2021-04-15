const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiFuzzy = require('chai-fuzzy');
const should = chai.should();
const CONFIG = require('../config');
const MOCK_DATA = require('../mock-data');

chai.use(chaiHttp);
chai.use(chaiHttp);
chai.use(chaiFuzzy);

describe('Single API', () => {
	describe('Burma card classification', () => {
		it('Normal Case', (done) => {
			chai.request(CONFIG.BASE_ENDPOINT)
				.post(CONFIG.ENDPOINT.CLASSIFY)
				.set('content-type', 'application/x-www-form-urlencoded')
				.set('Authorization', CONFIG.USER_TOKEN)
				.attach(CONFIG.FIELDS.CLASSIFY, MOCK_DATA.normalCase.burma.classify.input)
				.end((err, res) => {
					let expectResponse = MOCK_DATA.normalCase.burma.classify.expectOutput;
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('response_status').eql('OK');
					res.body.should.have.property('data').should.be.a('object');
					res.body.should.to.nested.include({'data.label': expectResponse.label});
					chai.assert.isAbove(res.body.data.score, expectResponse.score, `Output Score must be greater than ${expectResponse.score}`);
					done();
				});
		});
	});
});
