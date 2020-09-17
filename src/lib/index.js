import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import zipObject from 'lodash/zipObject';
import { injectReducer } from './asyncReducers';

export default function syncComponent(componentOpts, reducerOpts = {}) {
  let chunkName;
  let Component;
  let reducerKeys;

  if (typeof componentOpts !== 'string') {
    chunkName = componentOpts.chunkName;
    Component = componentOpts.component.default || componentOpts.component;
    reducerKeys = Object.keys(reducerOpts);
  } else {
    chunkName = componentOpts;
    Component = reducerOpts.default || reducerOpts;
  }

  function SyncComponent(props, context) {
    if (props.staticContext && props.staticContext.splitPoints) {
      props.staticContext.splitPoints.push(chunkName);
    }

    injectReducer(context.store, SyncComponent.reducers);

    return <Component {...props} />;
  }

  SyncComponent.propTypes = {
    staticContext: PropTypes.object.isRequired,
  };

  SyncComponent.contextTypes = {
    store: PropTypes.shape({
      replaceReducer: PropTypes.func.isRequired,
    }),
  };

  SyncComponent.reducers = {};

  SyncComponent.loadReducers = () => {
    if (reducerKeys && reducerKeys.length) {
      const reducerValues = reducerKeys.map(
        key => reducerOpts[key].default || reducerOpts[key]
      );

      SyncComponent.reducers = zipObject(reducerKeys, reducerValues);
    }
  };

  hoistNonReactStatics(SyncComponent, Component);

  return SyncComponent;
}
