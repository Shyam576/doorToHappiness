# Image audit and replacement report

Scope: every image reference in `src/data/*.json` (district images, individual places, package photos, attractions, guides) plus the homepage hero.

## Summary

| | Before | After |
|---|---|---|
| Image references audited | 273 | 273 |
| Remote (third-party hotlinked) references | 222 | 29 |
| Broken / unavailable references | 105 (101 unique URLs) | 0 |
| Locally hosted, optimised, licensed photos | 0 | 94 photos, one high-quality WebP each (max 1920px wide), 38 MB total |
| References replaced with a licensed local photo | | 172 |
| References removed (dead link or no rights) -> graceful placeholder | | 79 |

## What was found

- 83 of the dead links were on `bhutanpilgrimage.com`; the rest were scattered (`staticflickr`, `ucarecdn`, `nitrocdn`, `doc.gov.bt`, `wanderon`, others). Punakha's own image and Trongsa's (HTTP 403) were among them.
- 3 images were from Alamy and carried a visible watermark; 5 were Google image-search thumbnails. Rights could not be established for either kind, so all were removed.
- The 12 package photos were hotlinked from travel-agency websites (and Unsplash+); the 6 city packages shared one Unsplash photo. All were replaced.
- Where no licensed photograph of a specific place exists on Wikimedia Commons (many villages, markets, towns and some dzongs in the east and south), **no stand-in photograph was used**: the page shows the neutral placeholder panel instead of a misleading image.
- 18 district entries contained bare filenames (`bamboo-forest.jpg`) that never pointed at a real file; the page helpers already ignored them, and the two that remained were cleared.

## Source and licensing

All new photographs come from **Wikimedia Commons**, chosen because every file carries machine-readable licence and author data. Only CC0, public-domain, CC BY and CC BY-SA files were eligible. Each candidate was visually checked on a contact sheet against the place it was meant to show; many automatic matches were rejected (maps, portraits, post offices, the wrong fort, plants, a bird, rugs, a hand-lettered sign). Photographs of identifiable children were not used. Per-file credits are in `src/data/imageCredits.json` and are published on the site at `/photo-credits` (linked from the footer), which provides the attribution CC BY / CC BY-SA require.

| Licence | Photos |
|---|---|
| CC BY-SA 4.0 | 54 |
| CC BY-SA 3.0 | 15 |
| CC BY 2.0 | 14 |
| CC BY 3.0 | 8 |
| CC0 | 1 |
| CC BY 2.5 | 1 |
| CC BY 4.0 | 1 |

Photographers: Christopher J. Fynn (17), Bernard Gagnon (11), Vinayaraj (8), Arian Zwegers from Brussels, Belgium (8), Gerd Eichmann (6), David Broad (5), Leovdvxxx (3), Franzfoto (3).

Photos were resized (to at most 1920px wide) and re-encoded to WebP (a technical adaptation). They were not cropped, mirrored or retouched. Unsourced Unsplash+ (premium) images were removed from the packages.

## Where the files live

```
public/images/
  homepage/              hero (Tiger's Nest)
  destinations/          district images
  places/<dzongkhag>/    individual heritage sites and attractions
  gallery/               landmark photographs used across pages
  festivals/  trekking/  culture/
```
Each photograph is a single WebP file (up to 1920px wide, quality 80), referenced directly from the data. Photographs that no page used were removed.

## Replacement log

| Entity | New file | Reason |
|---|---|---|
| paro / Taktshang Monastery (Temple) | `/images/places/paro/bhutan-paro-136-taktshang-tigernest-gje.webp` | replaced with licensed local photo (old link was dead) |
| paro / Tachog Lhakhang (temple) | `/images/places/paro/tachog-lhakhang-dzong-near-paro-during-lgfc-bhutan-2019.webp` | replaced with licensed local photo (old link was dead) |
| paro / Chuzom | `/images/places/paro/gate-at-chuzom-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| paro / Ta Dzong (National Museum of Paro) | `/images/places/paro/paro-national-museum-ta-dzong-15221606394.webp` | replaced with licensed local photo (old link was dead) |
| paro / Rinpung Dzong | `/images/places/paro/rinpung-dzong-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| paro / Chele La Pass | `/images/places/paro/chele-la-pass-paro-during-lgfc-bhutan-2019-01.webp` | replaced with licensed local photo (old link was dead) |
| paro / Paro Airport View Point | `/images/places/paro/paro-airport-views-from-road-to-chelela-during-lgfc-bhut.webp` | replaced with licensed local photo (old link was dead) |
| paro / Paro Weekend Market | `/images/places/paro/paro-weekend-market-1-23737528251.webp` | replaced with licensed local photo (old link was dead) |
| paro / Dungtse Lhakhang | `/images/places/paro/dungtse-lhakhang-paro.webp` | replaced with licensed local photo (old link was dead) |
| paro / Drukgyel Dzong | `/images/places/paro/drukgyel-dzong.webp` | replaced with licensed local photo (old link was dead) |
| paro / Druk Choeding Lhakhang | `/images/places/paro/druk-chhoeding.webp` | replaced with licensed local photo (old link was dead) |
| paro / Dobji Dzong | `/images/places/paro/view-of-dobji-dzong.webp` | replaced with licensed local photo (old link was dead) |
| paro / Bhutanese Farmhouse | `/images/places/paro/bhutanese-farmhouse-soe-yaksa.webp` | replaced with licensed local photo (old link was dead) |
| paro (district images) | `/images/places/paro/bhutan-paro-136-taktshang-tigernest-gje.webp` | district photos replaced with licensed local photos |
| thimphu / Buddha Dordenma Statue | `/images/places/thimphu/buddha-dordenma-statue-and-around-thimphu-during-lgfc-bh.webp` | replaced with licensed local photo (old link was dead) |
| thimphu / Tashichho Dzong | `/images/places/thimphu/tashichho-dzong-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| thimphu / National Memorial Chorten | `/images/places/thimphu/entrance-of-national-memorial-chorten-thimphu.webp` | replaced with licensed local photo (old link was dead) |
| thimphu / Weekend Market (Centenary Farmers Market) | `/images/places/thimphu/centenary-farmers-market-thimphu.webp` | replaced with licensed local photo (old link was dead) |
| thimphu / Motithang Takin Preserve | `/images/places/thimphu/takins-at-motithang-takin-preserve-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| thimphu / Changangkha Lhakhang | `/images/places/thimphu/changangkha-lhakhang-2019-07-28.webp` | replaced with licensed local photo (old link was dead) |
| thimphu (district images) | `/images/places/thimphu/tashichho-dzong-bhutan-01.webp, /images/places/thimphu/buddha-` | district photos replaced with licensed local photos |
| punakha / Punakha Dzong | `/images/places/punakha/punakha-dzong-bhutan-02.webp` | replaced with licensed local photo |
| punakha / Chimi Lhakhang (Fertility and Name Giving Temple) | `/images/places/punakha/chimi-lhakhang-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| punakha / Punakha Suspension Bridge | `/images/places/punakha/bridge-across-the-pho-chhu-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| punakha / Khamsum Yulley Namgyal Chorten | `/images/places/punakha/bridge-to-khamsum-yulley-namgyal-chorten-punakha-valley.webp` | replaced with licensed local photo (old link was dead) |
| punakha (district images) | `/images/places/punakha/punakha-dzong-bhutan-02.webp, /images/places/punakha/bridge-to` | district photos replaced with licensed local photos |
| wangdue-phodrang / Gangtey Monastery (Gangtey Goenpa) | `/images/places/wangdue-phodrang/gangtey-gompa-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| wangdue-phodrang / Phobjikha Valley | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | replaced with licensed local photo (old link was dead) |
| wangdue-phodrang / Black-necked Crane Information Centre | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | replaced with licensed local photo (old link was dead) |
| wangdue-phodrang / Wangdue Phodrang Dzong | `/images/places/wangdue-phodrang/wangdi-phodrang-dzong.webp` | replaced with licensed local photo (old link was dead) |
| wangdue-phodrang / Khewang Village | `/images/places/wangdue-phodrang/khewang-lhakhang-phobjika-2019-08-19.webp` | replaced with licensed local photo (old link was dead) |
| wangdue-phodrang (district images) | `/images/places/wangdue-phodrang/gangtey-gompa-bhutan.webp, /images/gallery/phobjikha-` | district photos replaced with licensed local photos |
| bumthang / Jakar Dzong (Castle of the White Bird) | `/images/places/bumthang/bumthang-jakar-dzong-02-2015-gje.webp` | replaced with licensed local photo (old link was dead) |
| bumthang / Jambay Lhakhang | `/images/places/bumthang/around-jakar-jambay-lhakhang-15845859155.webp` | replaced with licensed local photo (old link was dead) |
| bumthang / Kurjey Lhakhang | `/images/places/bumthang/bumthang-kurjey-lhakhang-02-2015-gje.webp` | replaced with licensed local photo (old link was dead) |
| bumthang / Tamshing Lhakhang | `/images/places/bumthang/bumthang-tamshing-lhakhang-02-2015-gje.webp` | replaced with licensed local photo |
| bumthang / Mebar Tsho (Burning Lake) | `/images/places/bumthang/membartsho-the-burning-lake-in-tang-valley-central-bhuta.webp` | replaced with licensed local photo |
| bumthang / Ura Valley | `/images/places/bumthang/ura-mang-gi-lhakhang.webp` | replaced with licensed local photo |
| bumthang / Tang Valley | `/images/places/bumthang/membartsho-the-burning-lake-in-tang-valley-central-bhuta.webp` | replaced with licensed local photo |
| bumthang / Choekhor Valley | `/images/places/bumthang/around-jakar-ngang-lhakhang-15659835649.webp` | replaced with licensed local photo |
| bumthang (district images) | `/images/places/bumthang/bumthang-jakar-dzong-02-2015-gje.webp, /images/places/bumthan` | district photos replaced with licensed local photos |
| trongsa / Trongsa Dzong | `/images/gallery/trongsa-dzong-2001-a.webp` | replaced with licensed local photo |
| trongsa / Ta Dzong (Tower of Trongsa Museum) | `/images/places/trongsa/trongtsa-ta-dzong.webp` | replaced with licensed local photo (old link was dead) |
| trongsa / Chendebji Chorten | `/images/places/trongsa/chendebji-chorten-15221785034.webp` | replaced with licensed local photo (old link was dead) |
| trongsa (district images) | `/images/places/trongsa/chendebji-chorten-15221785034.webp` | district photos replaced with licensed local photos |
| mongar / Drametse Monastery | `/images/places/mongar/drametse-lhakhang-15658416298.webp` | replaced with licensed local photo (old link was dead) |
| mongar / Yagang Village | `/images/places/mongar/yagang-lhakhang-mongar.webp` | replaced with licensed local photo |
| mongar / Kuri Chhu River | `/images/places/mongar/stupa-am-flu-kurichu.webp` | replaced with licensed local photo |
| mongar (district images) | `/images/places/mongar/drametse-lhakhang-15658416298.webp, /images/places/mongar/yagan` | district photos replaced with licensed local photos |
| trashigang / Trashigang Dzong | `/images/places/trashigang/trashigang-dzong-rear-2008-01-02.webp` | replaced with licensed local photo (old link was dead) |
| trashigang / Merak and Sakteng Villages | `/images/places/trashigang/brokpa-cultural-dance.webp` | replaced with licensed local photo |
| trashigang / Trashigang Market | `/images/places/trashigang/trashigang-upper-market-bhutan-2008-01-02.webp` | replaced with licensed local photo |
| trashigang (district images) | `/images/places/trashigang/trashigang-dzong-rear-2008-01-02.webp, /images/destinations` | district photos replaced with licensed local photos |
| samdrup-jongkhar / Samdrup Jongkhar Market | `/images/places/samdrup-jongkhar/bhutan-s-mandarin-export-success-at-samdrup-jongkhar-1280.` | replaced with licensed local photo |
| samdrup-jongkhar / Manas River | `/images/places/samdrup-jongkhar/at-the-core-of-manas-national-park.webp` | replaced with licensed local photo |
| samdrup-jongkhar (district images) | `/images/places/samdrup-jongkhar/bhutan-s-mandarin-export-success-at-samdrup-jongkhar-1280.` | district photos replaced with licensed local photos |
| pemagatshel (district images) | `yurung-village.jpg` | dead links removed; no verified licensed photo found |
| haa / Lhakhang Karpo (White Temple) | `/images/places/haa/lhakhang-karpo-ha-during-lgfc-bhutan-2019-11.webp` | replaced with licensed local photo (old link was dead) |
| haa / Lhakhang Nagpo (Black Temple) | `/images/places/haa/lhakhang-nagpo-ha-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| haa / Haa Dzong | `/images/places/haa/haa-dzong-bhutan.webp` | replaced with licensed local photo |
| haa (district images) | `/images/places/haa/lhakhang-karpo-ha-during-lgfc-bhutan-2019-11.webp, /images/places/` | district photos replaced with licensed local photos |
| samtse / Samtse Town | `/images/places/samtse/one-and-only-buddhist-monastery-at-pemaling-gewog-in-sam.webp` | replaced with licensed local photo |
| samtse / Phuntsholing Border | `/images/places/samtse/bhutan-gate-phuentsholing-during-lgfc-bhutan-2019-1.webp` | replaced with licensed local photo |
| samtse / Gomtu Village | `/images/places/samtse/gomtu-border-gate-with-india-2009.webp` | replaced with licensed local photo |
| samtse (district images) | `/images/places/samtse/one-and-only-buddhist-monastery-at-pemaling-gewog-in-sam.webp, ` | district photos replaced with licensed local photos |
| chhukha (district images) | `/images/destinations/chhukha/chukha-bhutan-2004-a.webp` | district photos replaced with licensed local photos |
| tsirang / Damphu Town | `/images/places/tsirang/buddhist-prayer-hall-damphu-bhutan.webp` | replaced with licensed local photo |
| tsirang (district images) | `/images/destinations/tsirang/dzong-at-damphu-tsirang-bhutan.webp, /images/places/tsir` | district photos replaced with licensed local photos |
| sarpang / Royal Manas National Park | `/images/places/sarpang/royal-manas-national-park-bhutan.webp` | replaced with licensed local photo |
| sarpang / Manas River | `/images/places/samdrup-jongkhar/at-the-core-of-manas-national-park.webp` | replaced with licensed local photo |
| sarpang (district images) | `/images/places/samdrup-jongkhar/at-the-core-of-manas-national-park.webp, /images/plac` | district photos replaced with licensed local photos |
| zhemgang / Royal Manas National Park (Northern Section) | `/images/places/sarpang/royal-manas-national-park-bhutan.webp` | replaced with licensed local photo |
| lhuentse / Lhuentse Dzong | `/images/places/lhuentse/entrance-gate-to-lhuentse-dzong.webp` | replaced with licensed local photo (old link was dead) |
| lhuentse / Khoma Village | `/images/places/lhuentse/khoma-weaver-15223675234.webp` | replaced with licensed local photo |
| lhuentse / Kuri Chhu River | `/images/places/mongar/stupa-am-flu-kurichu.webp` | replaced with licensed local photo |
| lhuentse (district images) | `/images/places/lhuentse/entrance-gate-to-lhuentse-dzong.webp, /images/places/lhuentse` | district photos replaced with licensed local photos |
| trashiyangtse / Chorten Kora | `/images/places/trashiyangtse/chorten-kora-trashi-yangtse-bhutan-3413932258.webp` | replaced with licensed local photo (old link was dead) |
| trashiyangtse / Trashiyangtse Dzong | `/images/places/trashiyangtse/tashi-yangtse-dzong.webp` | replaced with licensed local photo (old link was dead) |
| trashiyangtse / Gom Kora Temple | `/images/places/trashiyangtse/trashigang-gom-kora-tempel-02.webp` | replaced with licensed local photo |
| trashiyangtse / Yangtse Village | `/images/places/trashiyangtse/trashiyangtse.webp` | replaced with licensed local photo |
| trashiyangtse (district images) | `/images/places/trashiyangtse/chorten-kora-trashi-yangtse-bhutan-3413932258.webp, /ima` | district photos replaced with licensed local photos |
| gasa / Gasa Dzong | `/images/places/gasa/gasa-dzong.webp` | replaced with licensed local photo (old link was dead) |
| gasa (district images) | `/images/places/gasa/gasa-dzong.webp` | district photos replaced with licensed local photos |
| Tashichodzong, Thimphu | `/images/places/thimphu/tashichho-dzong-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| Takin Zoo, Thimphu | `/images/places/thimphu/takins-at-motithang-takin-preserve-bhutan.webp` | replaced with licensed local photo |
| Weekend Market, Thimphu | `/images/places/thimphu/centenary-farmers-market-thimphu.webp` | replaced with licensed local photo (old link was dead) |
| Gangtey Monastery, Phobjika | `/images/places/wangdue-phodrang/gangtey-gompa-bhutan.webp` | replaced with licensed local photo |
| Buddha Point, Thimphu | `/images/places/thimphu/buddha-dordenma-statue-and-around-thimphu-during-lgfc-bh.webp` | replaced with licensed local photo (old link was dead) |
| Tiger Nest Hiking, Paro | `/images/places/paro/bhutan-paro-136-taktshang-tigernest-gje.webp` | replaced with licensed local photo |
| Punakha Dzong, Punakha | `/images/places/punakha/punakha-dzong-bhutan-02.webp` | replaced with licensed local photo (old link was dead) |
| Phobjikha Valley, Phobjikha, Gangtey | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | replaced with licensed local photo |
| Haa Valley, Haa District | `/images/gallery/haa-valley-ha-during-lgfc-bhutan-2019-117.webp` | replaced with licensed local photo |
| Dochula Pass | `/images/gallery/druk-wangyal-108-chortens-at-dochula-on-thimphu-punakha.webp` | replaced with licensed local photo |
| Punakha Suspension Bridge, Punakha | `/images/places/punakha/bridge-across-the-pho-chhu-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| Chimi Lhakhang, Punakha | `/images/places/punakha/chimi-lhakhang-bhutan-01.webp` | replaced with licensed local photo |
| cultural-1 Classical Cultural Tour | `/images/gallery/bhutan-paro-dzong-100-gje.webp` | third-party agency photo replaced with licensed local photo |
| cultural-2 Bhutan Cultural Tour with Bumdrak Trek | `/images/homepage/taktsang-monastery-bhutan-06.webp` | third-party agency photo replaced with licensed local photo |
| cultural-3 Bhutan Cultural & Nature Travel | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | third-party agency photo replaced with licensed local photo |
| festival-1 Paro Tsechu Festival Tour | `/images/festivals/paro-tshechu.webp` | third-party agency photo replaced with licensed local photo |
| festival-2 Royal Highland Festival Tour | `/images/festivals/masked-buddhist-dance.webp` | third-party agency photo replaced with licensed local photo |
| festival-3 Thimphu Tsechu Festival Tour | `/images/festivals/thimphu-tsechu-2014-10-04-a.webp` | third-party agency photo replaced with licensed local photo |
| trek-1 Jomolhari Trek | `/images/trekking/jhomolhari.webp` | third-party agency photo replaced with licensed local photo |
| trek-2 Bhutan Mountain Biking Adventures | `/images/culture/bumthang-pass-prayer-flags-2-23710576582.webp` | third-party agency photo replaced with licensed local photo |
| trek-3 Snowman Trek | `/images/trekking/gangkhar-puensum-landscape.webp` | third-party agency photo replaced with licensed local photo |
| group-1 Bhutan Group Tours From India | `/images/gallery/druk-wangyal-108-chortens-at-dochula-on-thimphu-punakha.webp` | third-party agency photo replaced with licensed local photo |
| group-2 Women Only Bhutan Group Tour | `/images/gallery/chele-la-pass-paro-during-lgfc-bhutan-2019-05.webp` | third-party agency photo replaced with licensed local photo |
| group-3 Nepal and Bhutan Group Tour Packages | `/images/gallery/punakha-dzong-bhutan-03.webp` | third-party agency photo replaced with licensed local photo |
| Bhutan Tour Packages from Mumbai | `/images/gallery/punakha-dzong-bhutan-05.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Bagdogra | `/images/gallery/view-of-the-paro-valley-from-the-tiger-s-nest-trail-bhut.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Kolkata | `/images/gallery/tashichho-dzong-bhutan-12.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Pune | `/images/gallery/phobjikha-valley-gangteng-monastery-15843416102.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Bangalore | `/images/gallery/bumthang-jakar-dzong-12-2015-gje.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Delhi | `/images/gallery/haa-valley-ha-during-lgfc-bhutan-2019-117.webp` | Unsplash hotlink replaced with licensed local photo |
| paro (district images) | `/images/places/paro/bhutan-paro-136-taktshang-tigernest-gje.webp, /images/gallery/vie` | district photos replaced with licensed local photos |
| thimphu (district images) | `/images/places/thimphu/tashichho-dzong-bhutan-01.webp, /images/places/thimphu/buddha-` | district photos replaced with licensed local photos |
| punakha (district images) | `/images/places/punakha/punakha-dzong-bhutan-02.webp, /images/places/punakha/bridge-to` | district photos replaced with licensed local photos |
| wangdue-phodrang (district images) | `/images/places/wangdue-phodrang/gangtey-gompa-bhutan.webp, /images/gallery/phobjikha-` | district photos replaced with licensed local photos |
| bumthang (district images) | `/images/places/bumthang/bumthang-jakar-dzong-02-2015-gje.webp, /images/places/bumthan` | district photos replaced with licensed local photos |
| trongsa (district images) | `/images/gallery/trongsa-dzong-2001-a.webp, /images/places/trongsa/chendebji-chorten-1` | district photos replaced with licensed local photos |
| mongar (district images) | `/images/places/mongar/drametse-lhakhang-15658416298.webp, /images/places/mongar/yagan` | district photos replaced with licensed local photos |
| trashigang (district images) | `/images/places/trashigang/trashigang-dzong-rear-2008-01-02.webp, /images/destinations` | district photos replaced with licensed local photos |
| samdrup-jongkhar (district images) | `/images/places/samdrup-jongkhar/bhutan-s-mandarin-export-success-at-samdrup-jongkhar-1280.` | district photos replaced with licensed local photos |
| haa (district images) | `/images/places/haa/lhakhang-karpo-ha-during-lgfc-bhutan-2019-11.webp, /images/places/` | district photos replaced with licensed local photos |
| samtse (district images) | `/images/places/samtse/one-and-only-buddhist-monastery-at-pemaling-gewog-in-sam.webp, ` | district photos replaced with licensed local photos |
| chhukha (district images) | `/images/destinations/chhukha/chukha-bhutan-2004-a.webp` | district photos replaced with licensed local photos |
| tsirang (district images) | `/images/destinations/tsirang/dzong-at-damphu-tsirang-bhutan.webp, /images/places/tsir` | district photos replaced with licensed local photos |
| sarpang (district images) | `/images/places/samdrup-jongkhar/at-the-core-of-manas-national-park.webp, /images/plac` | district photos replaced with licensed local photos |
| lhuentse (district images) | `/images/places/lhuentse/entrance-gate-to-lhuentse-dzong.webp, /images/places/lhuentse` | district photos replaced with licensed local photos |
| trashiyangtse (district images) | `/images/places/trashiyangtse/chorten-kora-trashi-yangtse-bhutan-3413932258.webp, /ima` | district photos replaced with licensed local photos |
| gasa (district images) | `/images/places/gasa/gasa-dzong.webp` | district photos replaced with licensed local photos |
| Tashichodzong, Thimphu | `/images/places/thimphu/tashichho-dzong-bhutan-01.webp` | replaced with licensed local photo (old link was dead) |
| Takin Zoo, Thimphu | `/images/places/thimphu/takins-at-motithang-takin-preserve-bhutan.webp` | replaced with licensed local photo |
| Weekend Market, Thimphu | `/images/places/thimphu/centenary-farmers-market-thimphu.webp` | replaced with licensed local photo (old link was dead) |
| Gangtey Monastery, Phobjika | `/images/places/wangdue-phodrang/gangtey-gompa-bhutan.webp` | replaced with licensed local photo |
| Buddha Point, Thimphu | `/images/places/thimphu/buddha-dordenma-statue-and-around-thimphu-during-lgfc-bh.webp` | replaced with licensed local photo (old link was dead) |
| Tiger Nest Hiking, Paro | `/images/places/paro/bhutan-paro-136-taktshang-tigernest-gje.webp` | replaced with licensed local photo |
| Punakha Dzong, Punakha | `/images/places/punakha/punakha-dzong-bhutan-02.webp` | replaced with licensed local photo (old link was dead) |
| Phobjikha Valley, Phobjikha, Gangtey | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | replaced with licensed local photo |
| Haa Valley, Haa District | `/images/gallery/haa-valley-ha-during-lgfc-bhutan-2019-117.webp` | replaced with licensed local photo |
| Dochula Pass | `/images/gallery/druk-wangyal-108-chortens-at-dochula-on-thimphu-punakha.webp` | replaced with licensed local photo |
| Punakha Suspension Bridge, Punakha | `/images/places/punakha/bridge-across-the-pho-chhu-bhutan.webp` | replaced with licensed local photo (old link was dead) |
| Chimi Lhakhang, Punakha | `/images/places/punakha/chimi-lhakhang-bhutan-01.webp` | replaced with licensed local photo |
| cultural-1 Classical Cultural Tour | `/images/gallery/bhutan-paro-dzong-100-gje.webp` | third-party agency photo replaced with licensed local photo |
| cultural-2 Bhutan Cultural Tour with Bumdrak Trek | `/images/homepage/taktsang-monastery-bhutan-06.webp` | third-party agency photo replaced with licensed local photo |
| cultural-3 Bhutan Cultural & Nature Travel | `/images/places/wangdue-phodrang/phobjikha-valley-black-neck-crane-bird-migration-sanctua-1` | third-party agency photo replaced with licensed local photo |
| festival-1 Paro Tsechu Festival Tour | `/images/festivals/paro-tshechu.webp` | third-party agency photo replaced with licensed local photo |
| festival-2 Royal Highland Festival Tour | `/images/festivals/masked-buddhist-dance.webp` | third-party agency photo replaced with licensed local photo |
| festival-3 Thimphu Tsechu Festival Tour | `/images/festivals/thimphu-tsechu-2014-10-04-a.webp` | third-party agency photo replaced with licensed local photo |
| trek-1 Jomolhari Trek | `/images/trekking/jhomolhari.webp` | third-party agency photo replaced with licensed local photo |
| trek-2 Bhutan Mountain Biking Adventures | `/images/culture/bumthang-pass-prayer-flags-2-23710576582.webp` | third-party agency photo replaced with licensed local photo |
| trek-3 Snowman Trek | `/images/trekking/gangkhar-puensum-landscape.webp` | third-party agency photo replaced with licensed local photo |
| group-1 Bhutan Group Tours From India | `/images/gallery/druk-wangyal-108-chortens-at-dochula-on-thimphu-punakha.webp` | third-party agency photo replaced with licensed local photo |
| group-2 Women Only Bhutan Group Tour | `/images/gallery/chele-la-pass-paro-during-lgfc-bhutan-2019-05.webp` | third-party agency photo replaced with licensed local photo |
| group-3 Nepal and Bhutan Group Tour Packages | `/images/gallery/punakha-dzong-bhutan-03.webp` | third-party agency photo replaced with licensed local photo |
| Bhutan Tour Packages from Mumbai | `/images/gallery/punakha-dzong-bhutan-05.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Bagdogra | `/images/gallery/view-of-the-paro-valley-from-the-tiger-s-nest-trail-bhut.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Kolkata | `/images/gallery/tashichho-dzong-bhutan-12.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Pune | `/images/gallery/phobjikha-valley-gangteng-monastery-15843416102.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Bangalore | `/images/gallery/bumthang-jakar-dzong-12-2015-gje.webp` | Unsplash hotlink replaced with licensed local photo |
| Bhutan Tour Packages from Delhi | `/images/gallery/haa-valley-ha-during-lgfc-bhutan-2019-117.webp` | Unsplash hotlink replaced with licensed local photo |
| trongsa / Pele La Pass | `/images/culture/pele-la-pass-on-the-nubding-to-wandue-phodrang-highway-b.webp` | second pass: licensed local photo added (previously no image) |
| mongar / Kori La Pass | `/images/places/mongar/distrikt-mongar-korela-pass-2400-m-nn.webp` | second pass: licensed local photo added (previously no image) |
| samdrup-jongkhar (district images) | `/images/places/samdrup-jongkhar/bhutan-s-mandarin-export-success-at-samdrup-jongkhar-1280.` | second pass: district photos added/updated from Commons district categ |
| chhukha (district images) | `/images/places/chhukha/chukha-dzong.webp, /images/destinations/chhukha/chukha-bhutan-` | second pass: district photos added/updated from Commons district categ |
| dagana (district images) | `/images/places/dagana/dagana-riverside.webp, /images/places/dagana/view-of-drujegang-` | second pass: district photos added/updated from Commons district categ |
| sarpang / Gelephu Town | `/images/places/sarpang/steet-of-old-houses-near-the-referral-hospital.webp` | second pass: licensed local photo added (previously no image) |
| sarpang (district images) | `/images/places/sarpang/view-of-moutains-from-gelephu-cropped.webp, /images/places/sar` | second pass: district photos added/updated from Commons district categ |
| zhemgang (district images) | `/images/places/zhemgang/ngangla-trong-lhakhang-panbang-dungkhag-2019-12-13.webp, /ima` | second pass: district photos added/updated from Commons district categ |
| trashiyangtse / Bomdeling Wildlife Sanctuary | `/images/places/trashiyangtse/bridge-to-bumdeling-sanctuary.webp` | second pass: licensed local photo added (previously no image) |
| gasa (district images) | `/images/places/gasa/gasa-dzong.webp, /images/places/gasa/jigme-dorji-national-park-bh` | second pass: district photos added/updated from Commons district categ |
| dagana / Dagapela Town | `/images/places/dagana/dagapela-main-road-view.webp` | second pass: licensed local photo added (previously no image) |
| dagana (district images) | `/images/places/dagana/dagapela-main-road-view.webp, /images/places/dagana/view-of-dru` | second pass: district photos added/updated from Commons district categ |

## Removed (no verified licensed photo)

| Entity | Old URL host | Reason |
|---|---|---|
| thimphu / National Institute for Zorig Chusum | www.handicraftsbhutan.org | dead link removed (no verified licensed photo found) -> graceful placeholder |
| bumthang / Swiss Farm | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| bumthang / Bumthang Brewery | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trongsa / Kuenga Rabten Palace | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trongsa / Trongsa Market | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trongsa / Mangde Chhu River | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trongsa / Pele La Pass | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| mongar / Mongar Dzong | cdn-fejnh.nitrocdn.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| mongar / Kori La Pass | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| mongar / Mongar Market | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| mongar / Shertang Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashigang / Radhi Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashigang / Kanglung (Sherubtse College) | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samdrup-jongkhar / Dewathang | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samdrup-jongkhar / Jomotsangkha Wildlife Sanctuary | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samdrup-jongkhar / Pemathang | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samdrup-jongkhar / Martshala | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Pemagatshel Dzong | doc.gov.bt | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Yurung Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Nganglam Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Khaling Wildlife Sanctuary | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Dungmin Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Khar Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| pemagatshel / Chongshing Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| haa / Haa Summer Festival Ground | cdn-fejnh.nitrocdn.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| haa / Uesu Village | upload.wikimedia.org | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samtse / Torsa River | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| samtse / Sipsu Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| chhukha / Tala Hydroelectric Project | assets.encardio.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Dagapela Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Bamboo Craft Center | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Kana Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Bamboo Forest Trail | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Daga River | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| dagana / Lhamoizingkha Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Traditional Medicine Institute | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Medicinal Plant Garden | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Tsirang Toed | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Subtropical Forest Reserve | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Barshong Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Mendrelgang Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| tsirang / Patshaling Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Gelephu Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Sarpang Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Tropical Wildlife Sanctuary | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Umling Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Shompangkha Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| sarpang / Jigme Singye Wangchuck National Park (Southern Section) | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Kheng Villages | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Traditional Weaving Center | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Mangde Chhu River Valley | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Tingtibi Town | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Buli Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| zhemgang / Panbang Wildlife Sanctuary | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| lhuentse / Kilung Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| lhuentse / Gangzur Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| lhuentse / Menbi Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| lhuentse / Tangmachu Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashiyangtse / Traditional Arts and Crafts Center | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashiyangtse / Bomdeling Wildlife Sanctuary | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashiyangtse / Kulong Chhu River | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| trashiyangtse / Doksum Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Gasa Hot Springs (Gasa Tshachu) | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Laya Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Snowman Trek Base Camp | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Lunana Villages | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Thanza Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Raphstreng Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| gasa / Koina Village | www.bhutanpilgrimage.com | dead link removed (no verified licensed photo found) -> graceful placeholder |
| paro / Nya Mey Zam Bridge | c8.alamy.com | watermarked (Alamy) or scraped search thumbnail: rights cannot be established -> |
| wangdue-phodrang / Tabiting Village | c8.alamy.com | watermarked (Alamy) or scraped search thumbnail: rights cannot be established -> |
| haa / Juneydrak Hermitage | encrypted-tbn0.gstatic.com | watermarked (Alamy) or scraped search thumbnail: rights cannot be established -> |
| chhukha / Chapcha Town | encrypted-tbn0.gstatic.com | watermarked (Alamy) or scraped search thumbnail: rights cannot be established -> |
| dagana / Daga Dzong | encrypted-tbn0.gstatic.com | watermarked (Alamy) or scraped search thumbnail: rights cannot be established -> |
| dagana (district image) | encrypted-tbn0.gstatic.com | scraped search thumbnail removed |
| zhemgang (district image) | encrypted-tbn0.gstatic.com | scraped search thumbnail removed |
| Shopping in Handicrafts Village, Thimphu | c8.alamy.com | watermarked (Alamy) or scraped search thumbnail -> removed |
| pemagatshel (district images) | yurung-village.jpg | dead links removed; no verified licensed photo found |
| paro (old top-level hero image) | www.andbeyond.com | hotel marketing photo (Six Senses Paro), rights not established -> removed; hero |

## Still third-party hotlinked (29): decision needed

These load today but come from agency, hotel or media sites and their reuse rights are **not established**. They are existing site content and were left in place; they should be replaced with photographs you own or have permission to use.

| Entity | Host |
|---|---|
| paro / Kichu Lhakhang (Temple)  | cdn.bookmytour.bt |
| paro /  Traditional Hot Stone Bath | www.aman.com |
| paro / Kila Goemba Nunnery | jimblockphoto.com |
| paro / Namgay Artisanal Brewery | admin.bhutaninbound.com |
| paro / Dzongdrakha Gompa | bhutanpilgrimage.com |
| paro / Chumphu Ney | dynamic-media-cdn.tripadvisor.com |
| paro / Bumdra Goemba | drukcdn.blob.core.windows.net |
| paro / Restaurant in Paro | visitbhutan.com |
| paro / Try Bhutanese Attire | www.dailybhutan.com |
| thimphu / Simply Bhutan Museum | cdn.bookmytour.bt |
| thimphu / Folk Heritage Museum | cdn.bookmytour.bt |
| punakha / Sangchhen Dorji Lhuendrup Nunnery | www.heavenlybhutan.com |
| punakha / Nalanda Buddhist Institute | www.tourmyindia.com |
| punakha / Wangchhu and Phochu Rivers Confluence | www.whitewaterguidebook.com |
| punakha / Limbukha Village | www.heavenlybhutan.com |
| punakha / Ritsha Village | www.bletour.com |
| punakha / Talo Village and Monastery | blog.bhutaninbound.com |
| wangdue-phodrang / Gangtey Nature Trail | www.andbeyond.com |
| wangdue-phodrang / Kumbu Village | www.bhutanhomestay.com |
| wangdue-phodrang / Longtey Village | www.andbeyond.com |
| wangdue-phodrang / Sha Radap | cdn.bookmytour.bt |
| mongar / Zhongar Dzong Ruins | upload.wikimedia.org |
| samdrup-jongkhar / Zangdo Pelri Lhakhang | www.heavenlybhutan.com |
| haa / Katsho Village | www.heavenlybhutan.com |
| chhukha / Gedu Town | www.prayerflagstours.com |
| chhukha / Wangchhu River | www.whitewaterguidebook.com |
| zhemgang / Zhemgang Dzong | cdn.bookmytour.bt |
| River Rafting in Punakha River, Punakha | i2.wp.com |
| Simply Bhutan Museum,Thimphu | tourbhutan.travel |
