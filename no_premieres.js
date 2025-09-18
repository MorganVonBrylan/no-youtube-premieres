"use strict";

let old;

const observer = new MutationObserver(() => {
	if(!location.pathname.includes("/subscriptions"))
		return;

	if(old === undefined)
		old = !!document.querySelector("ytd-rich-item-renderer #time-status");

	if(old) for(const card of document.getElementsByTagName("ytd-rich-item-renderer"))
	{
		const time = card.querySelector("#time-status");
		if(time && !time.textContent.match("[0-9]:[0-9]{2}"))
			removeCard(card);
	}
	else
		document.querySelectorAll("ytd-rich-item-renderer:has(lockup-attachments-view-model)").forEach(removeCard);
});

observer.observe(document.body, { childList: true, subtree: true });


function removeCard(card)
{
	let current = card.closest("ytd-rich-grid-row");
	card.remove();
	// Then shift the elements to avoid en ampty spot in the row
	let next = current.nextElementSibling;
	while(next.tagName === "YTD-RICH-GRID-ROW")
	{
		if(!next.offsetParent) // if it's not visible
			return;
		const nextFirst = next.querySelector("#contents > ytd-rich-item-renderer");
		current.querySelector("#contents").appendChild(nextFirst);
		current = next;
		next = current.nextElementSibling;
	}
}