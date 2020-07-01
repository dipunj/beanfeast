import {
	Grid,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	useMediaQuery,
} from '@material-ui/core';
import { RedirectButtons } from '../util';
const About = () => {
	const isMobile = useMediaQuery('(max-width:500px)');
	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Typography variant="h5">
					How to use {process.env.NEXT_PUBLIC_PROJECT_TITLE} ?
				</Typography>
				<Typography>
					<List>
						There is something called a pool (like a swimming pool):
						<ListItem>
							<ListItemText inset={!isMobile} primary="- Anyone can create a pool" />
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="- Pool urls are valid for 24hrs."
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- Join url can be shared in group chats and friends can join it.
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- After the pool has reached the max capacity, centroid is shown and you
							can use search.
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- Only the creater of the pool can modify things like max number of
							people allowed in the pool
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="- Only members of the pool can access it."
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- Anyone with the join url of the pool can join the pool as long it is
							not full.
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- If the pool size is decreased after it has become full, the members
							who recently joined would be kicked out of the pool
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="
							- Your location is anonymously stored on our server for 24hrs.
						"
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								inset={!isMobile}
								primary="- No data is shared with any third party."
							/>
						</ListItem>
					</List>
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h5">Why did I build it ?</Typography>
				<Typography variant="subtitle1">
					So every saturday me and my friends would go out in Bengaluru. We would have an
					hour long discussion over where to go. Usually we would open Google maps,
					Zomato, Dineout to find the places to visit. But our friend Lalaji lives so far
					away from us (in banglore only), that till date we don't know his exact address.
					I was idle, which I hate to be. So decided to build a web app just for finding
					the centroid from all our locations and provide a search tool, to find places in
					proximity of the calculated centroid.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography>
					This application serves just one occasional usecase: find the centroid and show
					what's in the proximity of it. I don't know how else it may be used, but I felt
					that google maps didn't provide this particular facility despite allowing people
					to share locations with each other.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography>
					Currently for demonstration purposes the app uses TomTom API for fetching the
					places in proximity of centroid, because Google just declines Indian Debit
					Cards, and hence I cannot use it. However, the app can be migrated to google
					maps api, within a few minutes, since the data fetch api is modular and can
					select which api to use to fetch the result.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<RedirectButtons showAbout={false} />
			</Grid>
		</Grid>
	);
};

export default About;
