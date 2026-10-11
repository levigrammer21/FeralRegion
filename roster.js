// Twenty-four new families, each with three distinct growth stages.
const families=[
['Sproutusk','Boughboar','Verdantusk','Nature','forest','boar','#72964d','#e7cf86','Roots spring up wherever its tusks turn the soil.'],
['Petalamb','Bloomwool','Floraram','Nature','meadow','ram','#c6b2cb','#e9d76c','Its wool shelters flowers through sudden frosts.'],
['Twigmite','Barkmantis','Canopyreaper','Nature','forest','mantis','#749951','#e7a56f','It trims dead branches with patient, precise strokes.'],
['Acornip','Oaknut','Grovetitan','Nature','forest','golem','#9b7859','#a6ce6d','Each season leaves a new ring beneath its bark.'],
['Sootlet','Cinderbat','Pyrowing','Fire','volcanic','bat','#aa665b','#ffc45a','It nests above warm vents and hunts drifting sparks.'],
['Flintchick','Flarehen','Crownblaze','Fire','meadow','rooster','#d47b48','#f4df85','Its sunrise call wakes every creature in the valley.'],
['Magmole','Cinderdig','Calderamole','Fire','volcanic','mole','#805f66','#ed9e49','Its broad claws cut cooling tunnels through lava rock.'],
['Wickit','Waxling','Candelord','Fire','volcanic','candle','#d4b080','#f3947d','It shares a steady flame with travelers caught in rain.'],
['Bubblit','Coralcrab','Reefclaw','Water','wetland','crab','#c88092','#8ad7d8','It gathers coral fragments to shelter tiny fish.'],
['Puddlepup','Wavewhisk','Harborseal','Water','wetland','seal','#7a9eaa','#d7d8ab','Its whiskers read ripples across a quiet harbor.'],
['Inklet','Quillquid','Scriptide','Water','wetland','squid','#9b86b5','#9de5cd','Its swirling ink draws maps of forgotten currents.'],
['Finlet','Sailfin','Reefdrake','Water','wetland','fish','#54acb6','#f0b77b','Its tall fins steer it through the strongest river bends.'],
['Flintoad','Quartzoad','Geocroak','Stone','rocky','toad','#a8967b','#b7d3cb','Its deep call echoes through chambers under the hills.'],
['Duneling','Sandspike','Dunescourge','Stone','rocky','scorpion','#c8a56b','#8d697c','Its tail senses tiny movements beneath the sand.'],
['Oreling','Ferradon','Ironcolossus','Stone','rocky','armored','#8a9499','#d9b76c','Layered plates ring like a bell when danger approaches.'],
['Buzzlet','Coilbee','Thunderhive','Storm','meadow','bee','#d0b347','#98d0e5','Its humming wings charge flowers with harmless sparks.'],
['Ziptail','Arcscale','Stormsail','Storm','rocky','lizard','#76a390','#ead36e','Its sail catches lightning and releases it as gentle static.'],
['Flurrit','Rimeowl','Aurorowl','Ice','snow','owl','#b6c5d7','#e7a9d9','Its silent wings carry ribbons of pale winter light.'],
['Chillpin','Icecrest','Frostemperor','Ice','snow','penguin','#7c93b6','#d3eee8','It takes the first watch during every blizzard.'],
['Shadelet','Gloomweb','Nightweaver','Shadow','forest','spider','#756b99','#c6a4c9','Its webs catch moonlight without catching fireflies.'],
['Lumipup','Halohound','Solarguard','Radiant','meadow','houndlight','#d7b979','#fff0bc','It walks beside anyone who has lost the way home.'],
['Prismite','Facetfly','Prismarch','Arcane','rocky','dragonfly','#a78eba','#86d6ce','Its transparent wings split sunlight into shifting symbols.'],
['Breezeling','Cloudray','Tempestray','Air','rocky','ray','#92b4b6','#e5d2a6','It floats on rising air above sunlit canyon walls.'],
['Driftling','Kitecrest','Zephyrwyrm','Air','snow','dragon','#a8b99a','#c9dcf4','Its long ribbon tail traces safe passages through storms.']
];
export const EXTRA_ROWS=families.flatMap((r,family)=>[0,1,2].map(stage=>[r[stage],r[3],r[5],r[6],r[7],r[4],[1,3,5][stage],stage<2?r[stage+1]:null,[20,40,0][stage],r[8],family,stage]));
