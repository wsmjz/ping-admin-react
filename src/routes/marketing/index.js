import syncComponent from '../../lib/index';
const Marketing = syncComponent(
    {
      chunkName: 'bbbbb',
      component: require('../../views/marketing/index')
    }
  )
const routes = [
  { path: '/marketing', exact: true, component: Marketing },
];
// 外面可以重命名为Marketing
export default routes;
