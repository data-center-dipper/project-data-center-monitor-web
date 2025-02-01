import { useRouter } from 'vue-router';

export function useRouteTitle() {
  const router = useRouter();

  router.beforeEach((to, from) => {
    if (to.meta && to.meta.title && to.meta.title !== from.meta?.title) {
      document.title = to.meta.title as string;
    }
  });
}
