import { DrawPosterBuildOpts } from "./interface"
import { PLATFORM } from "./global"

/** 是否是base64本地地址 */
export const isBaseUrl = (str: string) => {
  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str)
}
/** 是否是小程序本地地址 */
export const isTmpUrl = (str: string) => {
  return /http:\/\/temp\/wx/.test(str)
}
/** 是否是网络地址 */
export const isNetworkUrl = (str: string) => {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(str)
}
/** 对象target挂载到对象current */
export const extendMount = (
  current: Record<any, any>,
  target: Record<any, any>,
  handle = (extend: Function, init?: Function) => undefined as any
) => {
  for (const key in target) {
    current[key] = handle(target[key].handle, target[key].init) || target[key].handle
  }
}
/** 处理构建配置 */
export const handleBuildOpts = (options: string | DrawPosterBuildOpts) => {
  let defaultOpts = {
    selector: '',
    componentThis: undefined,
    type2d: true,
    loading: false,
    drawImageTime: 100,
    debugging: false,
    loadingText: '绘制海报中...',
    createText: '生成图片中...',
  }
  if (typeof options === "string") {
    defaultOpts.selector = options
  } else {
    defaultOpts = { ...defaultOpts, ...options }
  }
  const oldSelector = defaultOpts.selector

  if (PLATFORM === 'mp-weixin' && defaultOpts.type2d) {
    defaultOpts.selector = '#' + defaultOpts.selector
  }

  if (!PLATFORM) {
    console.error('注意! draw-poster未开启uni条件编译! 当环境是微信小程序将不会动态切换为type2d模式')
    console.error(`请在vue.config.js中的transpileDependencies中添加'uni-draw-poster'`)
    console.error(`或者可以在选择器字符串前缀中添加#来切换为type2d绘制(不推荐)`)
    defaultOpts.selector = oldSelector
  }
  return defaultOpts
}
