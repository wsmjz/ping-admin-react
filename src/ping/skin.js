import {get as getCache, save, LOCAL} from './storage'

const setTheme = require('../import/theme/' + process.env.NODE_ENV)
const LOCAL_CACHE_KEY = '__MY_SKIN__'


function createCacheKey(app) {
  return app ? `__MY_SKIN_${app}__` : LOCAL_CACHE_KEY
}

function setBodyClass(theme) {
  const classList = document.body.classList
  classList.forEach(name => {
    if (name.includes(LOCAL_CACHE_KEY)) {
      classList.remove(name)
    }
  })
  classList.add(`${LOCAL_CACHE_KEY}${theme}`)
}

export function change({theme, app, isMaster, container}) {
  save(createCacheKey(isMaster ? null : app), theme, LOCAL)
  setTheme(theme, app, container)
  setBodyClass(theme)
}

export function get(app = '', isMaster) {
  return getCache(createCacheKey(isMaster ? null : app), LOCAL) || null
}

export default function (app, isMaster) {
  return {
    inject: {
      appProps: {default: null},
      masterApp: {default: null}
    },
    data() {
      return {
        skin: get(app, isMaster) || 'default'
      }
    },
    watch: {
      skin: {
        immediate: true,
        handler(val) {
          this.changeTheme(val)

        }
      }
    },
    methods: {
      changeTheme(name) {
        change({
          theme: name,
          app,
          isMaster,
          container: this.appProps?.container
        })
        const state = {skin: name}
        if (this.appProps?.setGlobalState) {
          this.appProps.setGlobalState(state)
        }
        if (this.masterApp) {
          this.masterApp.setState(state)
        }

      },
      storageChangeHandler(evt) {
        if (!evt.key.startsWith(LOCAL_CACHE_KEY)) return
        this.skin = evt.newValue
      },
      handleStateChange(state) {
        this.skin = state.skin || 'default'
      }
    },
    created() {
      window.addEventListener('storage', this.storageChangeHandler)
      if (this.masterApp) {
        this.masterApp.onStateChange(this.handleStateChange)
      }
      if (this.appProps?.onGlobalStateChange) {
        this.appProps.onGlobalStateChange(this.handleStateChange)
      }
    },
    beforeDestroy() {
      window.removeEventListener('storage', this.storageChangeHandler)
    }
  }
}
