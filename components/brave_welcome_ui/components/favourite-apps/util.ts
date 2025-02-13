import { addNewTopSite } from "../../api/topSites"

interface FavouriteAppsProp {
    title: string
    id: number
    url: string
}
const AppUrls : any = {
    'Facebook' : 'facebook.com',
    'Figma' : 'figma.com',
    'Gmail' : 'gmail.com',
    'Calendar' : 'calendar.google.com',
    'Insta' : 'instagram.com',
    'Slack' : 'slack.com',
    'Spotify' : 'spotify.com',
    'X' : 'x.com',
    'Youtube':'youtube.com'
}

function addNewSites(FavouriteApp: FavouriteAppsProp[]): void {
    console.log("addNewSites ->",FavouriteApp)
    FavouriteApp.map(app => {
        addNewTopSite(app.title,app.url)
    })
}

export function setFavouriteApps(FavouriteAppsNameArray: string[]) {
    console.log("FavouriteAppsNameArray ->", FavouriteAppsNameArray)
    const FavouriteAppArray: FavouriteAppsProp[] = FavouriteAppsNameArray.map((app, index) => {
        return {
            title: app,
            url: AppUrls[app],
            id: index
        }
    })
    console.log("FavouriteAppArray ->",FavouriteAppArray)
    addNewSites(FavouriteAppArray)
}
