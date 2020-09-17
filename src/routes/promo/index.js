import syncComponent from '../../lib/index';
export const Promo = syncComponent(
    {
      chunkName: 'MemberLevelComponent',
      component: require('../../views/promo/index')
    }
  )