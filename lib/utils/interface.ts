/** 绘制容器 */
export type Execute = Array<() => Promise<boolean>>

/** 构建器配置 */
export interface DrawPosterBuildOpts {
  /** 查询选择器; 注意不需要加# */
  selector: string;
  /** 选取组件范围 */
  componentThis?: any;
  /** 绘制类型为2d绘制, 默认开启, 在微信小程序的时候动态加载 */
  type2d?: boolean;
  /** 是否在绘制时进行加载提示 */
  loading?: boolean;
  /** 当存在绘制图片时, 等待绘画完毕的时间（秒）仅App中生效
   * 
   *  具体查看文档说明：https://github.com/TuiMao233/uni-draw-poster
   */
  drawImageTime?: number
  /** 是否开启调试模式 */
  debugging?: boolean
  /** 加载提示文字 */
  loadingText?: string
  /** 创建图片提示文字 */
  createText?: string
}
/** 绘制换行配置 */
export interface FillWarpTextOpts {
  text: string;
  maxWidth?: number;
  lineHeight?: number;
  layer?: number;
  x?: number;
  y?: number;
  splitText?: string;
  notFillText?: boolean;
}

/** 绘制换行, 单行信息 */
export interface FillWarpTextItemInfo { text: string; y: number; x: number; }

/** 绘制画笔 */
export interface DrawPosterCanvasCtx extends UniApp.CanvasContext {
  createImageData: () => ImageData
  textAlign: CanvasTextDrawingStyles["textAlign"],
  textBaseline: CanvasTextDrawingStyles["textBaseline"]
  transform: CanvasTransform["transform"]
  oldDrawImage: UniApp.CanvasContext['drawImage']
  /** 该次绘画是否存在绘制图片 */
  existDrawImage: boolean
  /** 等待绘制图片
   * 
   * 说明文档: https://github.com/TuiMao233/uni-draw-poster#绘制图片
   */
  drawImage(url: string, x: number, y: number, w: number, h: number): Promise<boolean>;
  /** 绘制换行字体
   * 
   * 说明文档: https://github.com/TuiMao233/uni-draw-poster#换行字体
   */
  fillWarpText(options: FillWarpTextOpts): Array<FillWarpTextItemInfo>;
  /** 绘制圆角矩形（填充）
   * 
   * 说明文档: https://github.com/TuiMao233/uni-draw-poster#圆角矩形
   */
  fillRoundRect(x: number, y: number, w: number, h: number, r: number): void;
  /** 绘制圆角矩形（边框）
   * 
   * 说明文档: https://github.com/TuiMao233/uni-draw-poster#圆角矩形
   */
  strokeRoundRect(x: number, y: number, w: number, h: number, r: number): void;
  /** 绘制圆角图片
   * 
   * 说明文档: https://github.com/TuiMao233/uni-draw-poster#圆角图片
   */
  drawRoundImage(url: string, x: number, y: number, w: number, h: number, r?: number): Promise<boolean>;
}

/** Canvas2d实例 */
export interface Canvas {
  width: number;
  height: number;
  getContext(contextType: "2d" | "webgl"): DrawPosterCanvasCtx | WebGLRenderingContext;
  createImage(): {
    src: string;
    width: number;
    height: number;
    onload: () => void;
    onerror: () => void;
  };
  requestAnimationFrame(callback: Function): number;
  cancelAnimationFrame(requestID: number): void;
  createImageData(): ImageData;
  createPath2D(path: Path2D): Path2D;
  toDataURL(type: string, encoderOptions: number): string;
}

/** 创建图片路径配置项 */
export interface CreateImagePathOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  destWidth?: number;
  destHeight?: number;
}