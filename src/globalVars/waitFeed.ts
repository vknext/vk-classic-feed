import waitVariable from './utils/waitVariable';

const waitFeed = () => waitVariable('Feed', 'web/feed.js');

export default waitFeed;
