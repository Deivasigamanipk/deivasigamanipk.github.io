// json

jdata={
    "fibrepercent":0.125,
    "n":3.145, 
    "L":1.85, 
    "trashratio":1.7,
    "N":4.5,
    "fibreindex":[480,640,752,880],
    "millratio":[2.00,2.10,2.15,2.22],
    "lift":[8,7,6,6]    
}

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

       //tramble setting
       let rlrp_top_half_pcd, rlrp_feed, rlrp_disch, rlrp_trash

       rlrp_top_half_pcd=(top-groovedepth[mill][0])/2
       rlrp_feed=(rlrp_top_half_pcd+Feed)-380
       rlrp_disch=(rlrp_top_half_pcd+Dis)-380
       rlrp_trash=(rlrp_top_half_pcd+Trash)-380

      // console.log(rlrp_top_half_pcd, rlrp_feed, rlrp_disch, rlrp_trash
      //  )

      let cjson={
        "Feed": Feed.toFixed(3),
        "Dis": Dis.toFixed(3),
        "Trash":Trash.toFixed(3),
        "rfeed": rlrp_feed.toFixed(3),
        "rdisch": rlrp_disch.toFixed(3),
        "rtrash": rlrp_trash.toFixed(3),
        "additional":{

        }
    }

      

      return cjson
}

function getinput() {
    let tch,top1,feed1,disch1, top2,feed2,disch2, top3,feed3,disch3, top4,feed4,disch4

    tch=document.getElementById("tch").value

    top1=document.getElementById("top1").value
    feed1=document.getElementById("feed1").value
    disch1=document.getElementById("disch1").value

    top2=document.getElementById("top2").value
    feed2=document.getElementById("feed2").value
    disch2=document.getElementById("disch2").value

    top3=document.getElementById("top3").value
    feed3=document.getElementById("feed3").value
    disch3=document.getElementById("disch3").value

    top4=document.getElementById("top4").value
    feed4=document.getElementById("feed4").value
    disch4=document.getElementById("disch4").value
    return {
        "tch":parseFloat(tch),
        "top1":parseFloat(top1),
        "feed1":parseFloat(feed1),
        "disch1":parseFloat(disch1),
        "top2":parseFloat(top2),
        "feed2":parseFloat(feed2),
        "disch2":parseFloat(disch2),
        "top3":parseFloat(top3),
        "feed3":parseFloat(feed3),
        "disch3":parseFloat(disch3),
        "top4":parseFloat(top4),
        "feed4":parseFloat(feed4),
        "disch4":parseFloat(disch4)
    }
}

//f=calculate(115,932,927,945,3)
//console.log(f.Feed,f.Dis,f.Trash)
//console.log(f.rfeed,f.rdisch,f.rtrash)

function calculatef(inpjson) {
    calculatedjson_m1=calculate(inpjson.tch, inpjson.top1, inpjson.feed1,inpjson.disch1, 0)
    calculatedjson_m2=calculate(inpjson.tch, inpjson.top2, inpjson.feed2,inpjson.disch2, 1)
    calculatedjson_m3=calculate(inpjson.tch, inpjson.top3, inpjson.feed3,inpjson.disch3, 2)
    calculatedjson_m4=calculate(inpjson.tch, inpjson.top4, inpjson.feed4,inpjson.disch4, 3)
    return {
        "mill1":calculatedjson_m1,
        "mill2":calculatedjson_m2,
        "mill3":calculatedjson_m3,
        "mill4":calculatedjson_m4
    }
}

function output(allcalc) {
    // common output
    document.getElementById("mill1feed").innerHTML=allcalc.mill1.Feed
    document.getElementById("mill1disch").innerHTML=allcalc.mill1.Dis
    document.getElementById("mill1trash").innerHTML=allcalc.mill1.Trash

    document.getElementById("mill2feed").innerHTML=allcalc.mill2.Feed
    document.getElementById("mill2disch").innerHTML=allcalc.mill2.Dis
    document.getElementById("mill2trash").innerHTML=allcalc.mill2.Trash

    document.getElementById("mill3feed").innerHTML=allcalc.mill3.Feed
    document.getElementById("mill3disch").innerHTML=allcalc.mill3.Dis
    document.getElementById("mill3trash").innerHTML=allcalc.mill3.Trash

    document.getElementById("mill4feed").innerHTML=allcalc.mill4.Feed
    document.getElementById("mill4disch").innerHTML=allcalc.mill4.Dis
    document.getElementById("mill4trash").innerHTML=allcalc.mill4.Trash
    //common output finished

    //Tramble oudocument.getElementById("mill1feed").innerHTML=allcalc.mill1.Feed
    document.getElementById("tmill1feed").innerHTML=allcalc.mill1.rfeed
    document.getElementById("tmill1disch").innerHTML=allcalc.mill1.rdisch
    document.getElementById("tmill1trash").innerHTML=allcalc.mill1.rtrash

    document.getElementById("tmill2feed").innerHTML=allcalc.mill2.rfeed
    document.getElementById("tmill2disch").innerHTML=allcalc.mill2.rdisch
    document.getElementById("tmill2trash").innerHTML=allcalc.mill2.rtrash

    document.getElementById("tmill3feed").innerHTML=allcalc.mill3.rfeed
    document.getElementById("tmill3disch").innerHTML=allcalc.mill3.rdisch
    document.getElementById("tmill3trash").innerHTML=allcalc.mill3.rtrash

    document.getElementById("tmill4feed").innerHTML=allcalc.mill4.rfeed
    document.getElementById("tmill4disch").innerHTML=allcalc.mill4.rdisch
    document.getElementById("tmill4trash").innerHTML=allcalc.mill4.rtrash
    
    //Tramble output finished
}

function calculateclick() {
    inpjson=getinput()                   //gets input from doc
    allcalc=calculatef(inpjson)         //calculated values for all mills and get as json
    setoutput=output(allcalc)            //sets output in doc
    

}

function setdefaultoutput() {
    document.getElementById("fiberper").value=fibrepercent
    document.getElementById("pie").value=n
    document.getElementById("L").value=L
    document.getElementById("trashratio").value=trashratio
    document.getElementById("N").value=N

    document.getElementById("fibreindexm1").value=fibreindex[0]
    document.getElementById("fibreindexm2").value=fibreindex[1]
    document.getElementById("fibreindexm3").value=fibreindex[2]
    document.getElementById("fibreindexm4").value=fibreindex[3]

    document.getElementById("millratiom1").value=millratio[0]
    document.getElementById("millratiom2").value=millratio[1]
    document.getElementById("millratiom3").value=millratio[2]
    document.getElementById("millratiom4").value=millratio[3]

    document.getElementById("liftm1").value=lift[0]
    document.getElementById("liftm2").value=lift[1]
    document.getElementById("liftm3").value=lift[2]
    document.getElementById("liftm4").value=lift[3]
}

function takedefaultinput(){
    fibrepercent=document.getElementById("fiberper").value
    n=document.getElementById("pie").value
    L=document.getElementById("L").value
    trashratio=document.getElementById("trashratio").value
    N = document.getElementById("N").value

    fibreindex[0]=document.getElementById("fibreindexm1").value
    fibreindex[1]=document.getElementById("fibreindexm2").value
    fibreindex[2]=document.getElementById("fibreindexm3").value
    fibreindex[3]=document.getElementById("fibreindexm4").value

    millratio[0]=document.getElementById("millratiom1").value
    millratio[1]=document.getElementById("millratiom2").value=
    millratio[2]=document.getElementById("millratiom3").value=
    millratio[3]=document.getElementById("millratiom4").value=

    lift[0]=document.getElementById("liftm1").value
    lift[1]=document.getElementById("liftm2").value
    lift[2]=document.getElementById("liftm3").value
    lift[3]=document.getElementById("liftm4").value
}

function changeoriginal() {
    fibrepercent=jdata.fibrepercent
    n=jdata.n
    L=jdata.L
    trashratio=jdata.trashratio
    N=jdata.N

    fibreindex=jdata.fibreindex.slice(0,length(jdata.fibreindex))
    millratio=jdata.millratio.slice(0,length(jdata.millratio))
    lift=jdata.lift.slice(0,length(jdata.lift))
}



function modify() {
    takedefaultinput()
    setdefaultoutput()
}
function defaultoriginal() {
    changeoriginal()
    setdefaultoutput()
}