//data

let fibrepercent=0.125,n=3.145, L=1.85, trashratio=1.7, N=4.5
let fibreindex=[480,640,752,880]
let millratio=[2.00,2.10,2.15,2.22]
let lift=[8,7,6,6]

let groovedepth=[
    [46,76,58],
    [46,76,58],
    [27,44.5,30],
    [22,31,22]
]

//calculation
function calculate(tch,top,feed,disch,mill) {
    let dia,weightofcane,workopening,feedworkopening,trashopening,dis,settingfeed,trash;
       dia=((top-groovedepth[mill][0])+(feed-groovedepth[mill][1])+(disch-groovedepth[mill][2]))/3;
       dia/=1000
       weightofcane=(tch*1000)/60
       workopening=(weightofcane*fibrepercent)/(n*dia*L*N*fibreindex[mill])*1000
       feedworkopening=workopening*millratio[mill]
       trashopening=feedworkopening*trashratio
       dis=workopening-lift[mill]
       settingfeed=feedworkopening-lift[mill]
       trash=trashopening-lift[mill]
       
       //console.log(dia,weightofcane,workopening,feedworkopening,trashopening,
       // dis,settingfeed,trash)

       let Feed=settingfeed, Dis=dis, Trash=trash
       console.log(Feed)

       //tramble setting
       let rlrp_top_half_pcd, rlrp_feed, rlrp_disch, rlrp_trash

       rlrp_top_half_pcd=(top-groovedepth[mill][0])/2
       rlrp_feed=(rlrp_top_half_pcd+Feed)-380
       rlrp_disch=(rlrp_top_half_pcd+Dis)-380
       rlrp_trash=(rlrp_top_half_pcd+Trash)-380

      // console.log(rlrp_top_half_pcd, rlrp_feed, rlrp_disch, rlrp_trash
      //  )

      return {
          "Feed": Feed,
          "Dis": Dis,
          "Trash":Trash,
          "rfeed": rlrp_feed,
          "rdisch": rlrp_disch,
          "rtrash": rlrp_trash
      }
}

f=calculate(115,932,927,945,3)
console.log(f.Feed,f.Dis,f.Trash)
console.log(f.rfeed,f.rdisch,f.rtrash)