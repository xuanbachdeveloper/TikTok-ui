import Api from '~/Api/Api'

export const videosList = async (type, page) => {
    try {
        const res = await Api.getVideosList({
            params: {
                type,
                page,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
