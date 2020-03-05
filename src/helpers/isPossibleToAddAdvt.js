export const isPossibleToAddAdvt = (arr,user) => {
  let now = new Date().getTime();

  let userAds = arr.filter(i => i.email === user)

  let filtered = userAds.length ? userAds.filter(i => {
    if (i.email === user && now <= i.expire_date) {
			return true
		}
		return false
  }): [];

  return filtered.length > 4 ? false : true;
};
