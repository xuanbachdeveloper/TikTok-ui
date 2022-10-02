import Api from '~/Api/Api'

export const follow = async (data) => {
    try {
        const res = await Api.followAccount({
            params: {
                data
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const unFollow = async (q, type = 'unfollow') => {
      try {
          const res = await Api.unFollowAccount({
              id: {
                  q,
                  type,
              },
          })
          return res.data
      } catch (error) {
          console.log(error)
      }
  }
