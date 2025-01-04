/**
 * @description: Find the route name by path
 * */
export const findRouteNameByPath = (routerArray: any, index: any) => {
    for (const route of routerArray) {
        if (route.children) {
            const item = route.children.find((child: any) => child.path === index)
            if (item) {
                return item.meta.title
            }
        }
    }
    return null
}