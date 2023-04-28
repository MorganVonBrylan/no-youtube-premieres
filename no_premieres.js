"use strict";

const observer = new MutationObserver(mutations => {
	if(!location.pathname.includes("/subscriptions"))
		return;

	for(const card of document.getElementsByTagName("ytd-grid-video-renderer"))
		if(card.querySelector("#buttons *"))
			card.remove();
});

observer.observe(document.body, { childList: true, subtree: true });
