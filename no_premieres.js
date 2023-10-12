	"use strict";

const observer = new MutationObserver(mutations => {
	if(!location.pathname.includes("/subscriptions"))
		return;

	// old UI
	for(const card of document.getElementsByTagName("ytd-grid-video-renderer"))
		if(card.querySelector("#buttons *"))
			card.remove();
	
	// new UI
	for(const card of document.getElementsByTagName("ytd-rich-item-renderer"))
		if(!card.querySelector("#time-status").textContent.match("[0-9]:[0-9]{2}"))
			card.remove();
});

observer.observe(document.body, { childList: true, subtree: true });
