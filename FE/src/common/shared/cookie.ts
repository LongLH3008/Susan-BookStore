export function getCookie(cookieName: string) {
	console.log(cookieName);
	const cookieString = document.cookie;
	const cookies = cookieString.split("; ");
	for (let cookie of cookies) {
		const [name, value] = cookie.split("=");
		if (name === cookieName) {
			return decodeURIComponent(value);
		}
	}
	return null;
}
