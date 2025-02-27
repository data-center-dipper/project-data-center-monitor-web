import {
  boxStyleEnum,
  containerWidthEnum,
  systemThemeEnum,
  menuThemeEnum,
} from '@/enums'

import type { menuThemeType } from '@/types/config'

/**
 * 项目基础信息
 * * * PROJECT_NAME: 项目名称
 * */
export const PROJECT_NAME = 'Kafka监控系统'

/**
 * 项目基础配置
 * * * SettingThemeList: 项目主题列表
 * * * containerWidthList: 项目容器宽度列表
 * * * box-style: 容器样式
 * * * mainColorList: 系统主题颜色列表
 * * * menuThemeList 菜单样式列表
 * */
export const settingThemeList = [
  {
    name: '浅色',
    theme: systemThemeEnum.LIGHT,
    color: ['#fff', '#fff'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
  {
    name: '深色',
    theme: systemThemeEnum.DARK,
    color: ['#22252A'],
    leftLineColor: '#3F4257',
    rightLineColor: '#3F4257',
  },
  {
    name: '系统',
    theme: systemThemeEnum.AUTO,
    color: ['#fff', '#22252A'],
    leftLineColor: '#EDEEF0',
    rightLineColor: '#3F4257',
  },
]

export const containerWidthList = [
  {
    value: containerWidthEnum.FULL,
    label: '铺满',
    icon: 'left-right',
  },
  {
    value: containerWidthEnum.BOXED,
    label: '定宽',
    icon: 'arrows-left-right-to-line',
  },
]

export const boxStyleList = [
  {
    label: '边框',
    value: boxStyleEnum.BORDER,
  },
  {
    label: '阴影',
    value: boxStyleEnum.SHADOW,
  },
]

export const mainColorList = [
  '#409eff',
  '#67c23a',
  '#e6a23c',
  '#f56c6c',
  '#909399',
  '#d9d9d9',
  '#303133',
]

export const menuThemeList: menuThemeType[] = [
  {
    theme: menuThemeEnum.DESIGN,
    background: '#FFFFFF',
    systemNameColor: 'var(--art-text-gray-800)',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FAFBFC',
    systemBackground: '#FAFBFC',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
  {
    theme: menuThemeEnum.DARK,
    background: '#191A23',
    systemNameColor: '#BABBBD',
    iconColor: '#BABBBD',
    textColor: '#BABBBD',
    textActiveColor: '#FFFFFF',
    iconActiveColor: '#FFFFFF',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#3F4257',
    rightLineColor: '#EDEEF0',
  },
  {
    theme: menuThemeEnum.LIGHT,
    background: '#ffffff',
    systemNameColor: '#68758E',
    iconColor: '#6B6B6B',
    textColor: '#29343D',
    textActiveColor: '#3F8CFF',
    iconActiveColor: '#333333',
    tabBarBackground: '#FFFFFF',
    systemBackground: '#F8F8F8',
    leftLineColor: '#EDEEF0',
    rightLineColor: '#EDEEF0',
  },
]
