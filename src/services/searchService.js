import Api from '~/Api/Api'

export const search = async (q, type = 'less') => {
    try {
        const res = await Api.getSearchUsers({
            params: {
                q,
                type,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
