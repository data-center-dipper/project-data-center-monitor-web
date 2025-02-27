import { menuThemeEnum } from '@/enums'

export interface menuThemeType {
  theme: menuThemeEnum // 主题名称
  background: string // 背景色
  systemNameColor: string // 系统标题颜色
  textColor: string // 文字颜色
  textActiveColor: string // 文字选中颜色
  iconColor: string // 图标颜色
  iconActiveColor: string // 图标选中颜色
  tabBarBackground: string // 顶栏背景色
  systemBackground: string // 系统背景色
  leftLineColor: string // 左侧线条颜色
  rightLineColor: string // 右侧线条颜色
}
