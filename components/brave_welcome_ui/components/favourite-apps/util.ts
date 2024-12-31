import { addNewTopSite } from "../../api/topSites"

interface FavouriteAppsProp {
    title: string
    id: number
    url: string
}
const AppUrls : any = {
    'Facebook' : 'www.facebook.com',
    'Figma' : 'www.figma.com',
    'Gmail' : 'www.gmail.com',
    'Calendar' : 'www.calendar.google.com',
    'Insta' : 'www.instagram.com',
    'Slack' : 'www.slack.com',
    'Spotify' : 'www.spotify.com',
    'X' : 'www.twitter.com',
    'Youtube':'www.youtube.com'
}

function addNewSites(FavouriteApp: FavouriteAppsProp[]): void {
    console.log(FavouriteApp)
    FavouriteApp.map(app => {
        addNewTopSite(app.title,app.url)
    })
}

export function setFavouriteApps(FavouriteAppsNameArray: string[]) {
    console.log("FavouriteAppsNameArray", FavouriteAppsNameArray)
    const FavouriteAppArray: FavouriteAppsProp[] = FavouriteAppsNameArray.map((app, index) => {
        return {
            title: app,
            url: AppUrls[app],
            id: index
        }
    })
    addNewSites(FavouriteAppArray)
}
