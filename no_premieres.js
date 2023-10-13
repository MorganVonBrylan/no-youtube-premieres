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
	{
		const time = card.querySelector("#time-status");
		if(time && !time.textContent.match("[0-9]:[0-9]{2}"))
		{
			const row = card.closest("ytd-rich-grid-row");
			card.remove();
			shiftItems(row);
		}
	}
});

observer.observe(document.body, { childList: true, subtree: true });


function shiftItems(fromRow)
{
	let current = fromRow;
	let next = current.nextElementSibling;
	while(next.tagName === "YTD-RICH-GRID-ROW")
	{
		const nextFirst = next.querySelector("#contents > ytd-rich-item-renderer");
		current.querySelector("#contents").appendChild(nextFirst);
		current = next;
		next = current.nextElementSibling;
	}
}