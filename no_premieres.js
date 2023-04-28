"use strict";

const {pathname} = location;

if(pathname.includes("/subscriptions"))
{
	for(const card of document.getElementsByTagName("ytd-grid-video-renderer"))
	{
		if(card.querySelector("#buttons *"))
			card.remove();
	}
}
