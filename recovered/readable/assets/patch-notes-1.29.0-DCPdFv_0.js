const e = `# Version 1.29.0 Patch Notes\r
\r
**One account across every sign-in, friend requests, settings to turn off invitations, the Celestial Caravan before you enter a world, gentler exhaustion, and a long list of fixes.**\r
\r
> Discord caps a message at 2000 characters. This file is split at each \`---\` marker;\r
> post each part as its own message.\r
\r
---\r
\r
## One account, every way you sign in\r
\r
- **Link your sign-ins.** Open the gear on the realm select screen and link Google, Apple, Steam, GitHub or an email and password to the same account. Sign in with any of them, on any device, and you arrive in the same place with the same cultivators. You can unlink one too, as long as another way in remains.\r
- **Already used elsewhere?** A sign-in that already belongs to another account cannot be linked. To combine two accounts, sign in to the one you no longer want, delete it, then link that sign-in here.\r
- **A proper welcome.** New players choose their username and can link their other sign-ins straight away, and creating an account with an email now moves right on to linking.\r
\r
## The Celestial Caravan, before you enter a world\r
\r
A crystal button now sits at the top of the realm select screen, so you can buy crystals, supporter tiers and cosmetics without entering a world. The locked Obscure Realms note has a **Purchase Pass** button that opens the Caravan on the pass.\r
\r
---\r
\r
## Friends\r
\r
- **Friend requests.** Adding someone now asks them first. They can accept or decline from their notifications or the Friends tab, and accepting makes you friends on both sides. Two cultivators who add each other are simply friends. Declining is quiet: nobody is told.\r
- **See who is who.** Friends show the username of the account they belong to, and all of one person's characters are grouped together.\r
- **Removing a friend** removes the friendship on both sides.\r
\r
## Invitations: your choice\r
\r
**Settings → Invitations** has four switches, set per character:\r
\r
- **Refuse duels.** Nobody can challenge you to a duel or spar, and you cannot challenge anyone.\r
- **Refuse sect invitations**, **Dao Companion proposals** and **friend requests.** You can still apply, propose and add yourself.\r
\r
A refused invitation is never sent, so you are never bothered by it. Switching one on also clears anything already waiting.\r
\r
## World chat\r
\r
A small green dot on the chat button, and on the World tab, means someone has spoken in world chat since you last looked.\r
\r
---\r
\r
## Balance\r
\r
- **Exhaustion is gentler.** A level of exhaustion now builds every **30** hunts instead of 10, and each **10** minutes without a hunt takes a level away. The −10% / −25% / −75% penalties and the knock-out are unchanged.\r
- **Breaking down pills** now returns materials only rarely (**1 in 20** per pill). Pills are made to be used or sold, and some batches were worth more taken apart than they cost to brew.\r
- **Cultivation manuals drop less often** while exploring. The secret manuals tied to a bloodline or physique are now found only in tier 6 and higher regions, and much more rarely.\r
- **Recipes use materials of their own tier.** Many blueprints, pill recipes and array plates asked for a material from a tier or two above what they make. They now use a material of the same kind from their own tier.\r
- **Physique drawbacks.** Lower-rank physiques listed their damage reduction a second time, under drawbacks. That duplicate is gone, along with the extra damage reduction it was quietly adding. Three physiques that were weak to an element they resist have a different weakness.\r
- **Weapon Instinct** soul nodes now carry **10** levels of that weapon's mastery through reincarnation **per rank**, as described. One rank carried only 2.\r
\r
---\r
\r
## Fixes\r
\r
- **Pressing Search Here repeatedly** no longer runs several searches side by side until you stop. Restarting auto-combat had the same problem, also fixed.\r
- **NPC sects** sell their own cultivation manual in the merit hall again. A sect in a newer world could be missing it.\r
- **NPC sects are never demonic.**\r
- **The world map and town maps** can be dragged with the mouse, and the mouse wheel scrolls them sideways. On a wide window part of the map could not be reached.\r
- **A random event's outcome** stays on screen until you close it, instead of vanishing after half a second.\r
- **Tutorial pointers** no longer sit on top of the button they ask you to press.\r
- **The auto-combat screen** says every 2 minutes, not 5.\r
- **Messages and your Dao Companion** update the moment something changes, and several screens refresh less often in the background.\r
- **Server stability.** The disconnections some players saw after 1.28.0 are fixed.\r
- **Android supporters.** Supporter subscriptions bought on Google Play are now confirmed with Google, so they are no longer refunded after three days.\r
`;
export { e as default };
