export const businessLogic = {
    createObjects() {
        const now = Date.now()
        this.objects = Array(10000).fill(0).map(function objectFactory(_, index) {
            return {
                foo: 'bar',
                index,
                meta: {}
            }
        })
    }
}