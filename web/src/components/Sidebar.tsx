import React from "react"
import { TiFlag, TiFlash, TiHome, TiNotes, TiStarFullOutline } from "react-icons/ti"
import { DrawerItem, MiniDrawer } from "./MiniDrawer";

interface Props { }

const drawerItems: DrawerItem[] = [
  { name: "Home", icon: <TiHome size={24} /> },
  { name: "Favorites", icon: <TiStarFullOutline size={24} /> },
  { name: "Flag", icon: <TiFlag size={24} /> },
  { divider: true },
  { name: "Lightning", icon: <TiFlash size={24} /> },
  { name: "Music", icon: <TiNotes size={24} /> },
]

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <MiniDrawer items={drawerItems}>
      {children}
    </MiniDrawer>
  )

  // return (
  //   <>
  //     <Box sx={{ display: 'flex' }}>
  //       <Drawer variant="permanent" anchor="left"
  //         sx={{
  //           width: drawerWidth,
  //           flexShrink: 0,
  //           '& .MuiDrawer-paper': {
  //             width: drawerWidth,
  //             boxSizing: 'border-box',
  //             // overflowX: "hidden"
  //           }
  //         }}>

  //         <List>
  //           <Tooltip title="Aletheia" arrow placement="right" >
  //             <ListItem sx={{ pl: 2.5, py: 2, mt: -0.5, mb: 0.5 }}>
  //               <TiThLarge size={28} />
  //             </ListItem>
  //           </Tooltip>

  //           {drawerItems.map(({ name = "", icon, divider }) => (
  //             divider ? <Divider /> :
  //               <Tooltip key={name} title={name} arrow placement="right" enterDelay={1000} >
  //                 <ListItem button key={name} sx={{ pl: 2.5, py: 2, }}>
  //                   {icon}
  //                 </ListItem>
  //               </Tooltip>
  //           ))}
  //         </List>
  //       </Drawer>

  //       {/* <Box sx={{ mt: "64px" }}> */}
  //       {children}
  //       {/* </Box> */}
  //     </Box>
  //   </>
  // )
}
