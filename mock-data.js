const path = require('path');
const baseSourceTest = path.join(process.cwd(), 'source');

module.exports = {
	normalCase: {
		burma: {
			classify: {
				input: path.join(baseSourceTest, 'burma_nrc_id_front_left.jpg'),
				expectOutput: {
					label: 'front_left_nrc_id',
					score: 0.8
				}
			}
		}
	}
};
