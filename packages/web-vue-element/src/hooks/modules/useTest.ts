export default function useTest() {
    /**
     * @description 测试环境变量的使用
     * import.meta.env
     * */
    console.log(import.meta.env)

    const apiUrl = import.meta.env.VITE_API_URL
    const appTitle = import.meta.env.VITE_APP_TITLE
    console.log('API URL:', apiUrl)
    console.log('App Title:', appTitle)

    /**
     * @description
     * import.meta.url
     * */
    console.log(import.meta.url)

    /**
     * @description 验证当前的项目运行时环境
     * */
    if (import.meta.env.MODE === 'development') {
        console.log('Running in development mode')
    } else if (import.meta.env.MODE === 'production') {
        console.log('Running in production mode')
    }
}