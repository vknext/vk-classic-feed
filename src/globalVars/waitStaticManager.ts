import waitGlobalVariable from 'src/lib/waitGlobalVariable';

const waitStaticManager = () => waitGlobalVariable('stManager');

export default waitStaticManager;
