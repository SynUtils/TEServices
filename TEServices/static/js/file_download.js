var arr = new Array();
arr[0] = new Array("-select-");
arr[1] = new Array("-select-","Pages","Paragraphs","Sentences","Words","Characters","Sections","Fields","Fields_IncludePicture","Fields_Sequence","Fields_Embed","Fields_Formula","Fields_TOCEntry","Fields_DocInfo","Fields_UserInfo","Endnotes","Footnotes","FormFields",
        "Bookmarks","Headers","Footers","Comments","CustomXmlParts","Hyperlinks","Lists","Shapes","Shapes_Picture","Shapes_LinkedPicture","Shapes_AutoShape","Shapes_Line","Shapes_TextBox","Shapes_Group","Shapes_Callout","Shapes_Media","Shapes_Canvas",
        "Shapes_Diagram","Shapes_EmbeddedOLEObject","Shapes_ShapeTypeMixed","Shapes_TextEffect","Shapes_SmartArt","Shapes_Table","InlineShapes","InlineShapes_Picture","InlineShapes_LinkedPicture","InlineShapes_EmbeddedOLEObject","InlineShapes_Chart",
        "InlineShapes_HorizontalLine","InlineShapes_OLEControlObject","InlineShapes_SmartArt","InlineShapes_ShapeDiagram","InlineShapes_PictureBullet","Styles","Tables","TOC","Indexes");
arr[3] = new Array("-select-","Cell_Formatting_Date_Format","Cell_Formatting_Number_Format","Cell_Formatting_Currency_Format","Cell_Formatting_Percentage_Format",	"Cell_Formatting_Text_Horizontal_Left_Align","Cell_Formatting_Text_Horizontal_Right_Align","Cell_Formatting_Text_Horizontal_Centre_Align",
        "Cell_Formatting_Text_Vertical_Top_Align","Cell_Formatting_Text_Vertical_Bottom_Align","Cell_Formatting_Text_Vertical_Centre_Align","Cell_Formatting_Fill_Pattern_Style","Cell_Formatting_Fill_Background_Colour","Charts","Symbols","Pivot_table",
        "Filters","Comments","Formula","Functions","Styles","Sorting","Cell_merge_unmerge","Freeze_panes","Worksheets","Embedded_Objects","Smart ART","Images_Png_Gif","Images_EMF_WMF","Protected_Sheet","Shapes","Table",
        "Hyperlink","HasVBScripts","Forms_Fields","ActiveX_Controls","Conditional_Formatting","Wrap_Text","Hidden_sheet","Merge_Sheet","Page_break",
        "Protected_cell","Cell_Borders");
arr[2] = new Array("-select-","Pages","Paragraphs","Sentences","Words","Characters","Sections","Fields","Fields_IncludePicture","Fields_Sequence","Fields_Embed","Fields_Formula","Fields_TOCEntry","Fields_DocInfo","Fields_UserInfo","Endnotes","Footnotes","FormFields",
        "Bookmarks","Headers","Footers","Comments","CustomXmlParts","Hyperlinks","Lists","Shapes","Shapes_Picture","Shapes_LinkedPicture","Shapes_AutoShape","Shapes_Line","Shapes_TextBox","Shapes_Group","Shapes_Callout","Shapes_Media","Shapes_Canvas",
        "Shapes_Diagram","Shapes_EmbeddedOLEObject","Shapes_ShapeTypeMixed","Shapes_TextEffect","Shapes_SmartArt","Shapes_Table","InlineShapes","InlineShapes_Picture","InlineShapes_LinkedPicture","InlineShapes_EmbeddedOLEObject","InlineShapes_Chart",
        "InlineShapes_HorizontalLine","InlineShapes_OLEControlObject","InlineShapes_SmartArt","InlineShapes_ShapeDiagram","InlineShapes_PictureBullet","Styles","Tables","TOC","Indexes");
arr[4] = new Array("-select-","Cell_Formatting_Date_Format","Cell_Formatting_Number_Format","Cell_Formatting_Currency_Format","Cell_Formatting_Percentage_Format",	"Cell_Formatting_Text_Horizontal_Left_Align","Cell_Formatting_Text_Horizontal_Right_Align","Cell_Formatting_Text_Horizontal_Centre_Align",
        "Cell_Formatting_Text_Vertical_Top_Align","Cell_Formatting_Text_Vertical_Bottom_Align","Cell_Formatting_Text_Vertical_Centre_Align","Cell_Formatting_Fill_Pattern_Style","Cell_Formatting_Fill_Background_Colour","Charts","Symbols","Pivot_table",
        "Filters","Comments","Formula","Functions","Styles","Sorting","Cell_merge_unmerge","Freeze_panes","Worksheets","Embedded_Objects","Smart_ART","Images_Png_Gif","Images_EMF_WMF","Protected_Sheet","Shapes","Table",
        "Hyperlink","HasVBScripts","Forms_Fields","ActiveX_Controls","Conditional_Formatting","Wrap_Text","Hidden_sheet","Merge_Sheet","Page_break",
        "Protected_cell","Cell_Borders");

arr[5] = new Array("-select-","Animations","Comments","Embedded_Objects","Embedded_Objects_Charts","Fonts_Font_Effects","Headers_Footers","Hyperlinks","Images_EMF_WMF","Images_PNG_GIF_JPG","Shapes","Shapes_3D_Effects","Shapes_Fills","Shapes_Freeform","Shapes_Other_Effects",
        "Slide_Backgrounds","SmartArt","Speaker_Notes","Tables","Text_Box","Themes","Transitions","Lists_Numeric","Fonts","Lists_Character","Lists_Picture","Group_shapes","Hidden_Slides");
arr[6] = new Array("-select-","Animations","Comments","Embedded_Objects","Embedded_Objects_Charts","Fonts_Font_Effects","Headers_Footers","Hyperlinks","Images_EMF_WMF","Images_PNG_GIF_JPG","Shapes","Shapes_3D_Effects","Shapes_Fills","Shapes_Freeform","Shapes_Other_Effects",
        "Slide_Backgrounds","SmartArt","Speaker_Notes","Tables","Text_Box","Themes","Transitions","Lists_Numeric","Fonts","Lists_Character","Lists_Picture","Group_shapes","Hidden_Slides");

function change(combo1)
{
    var comboValue=combo1.value;
    document.forms["ajax"].elements["combo2"].options.length=0;
    for (var i=0;i<arr[comboValue].length;i++)
    {
        var option = document.createElement("option");
        option.innerHTML = arr[comboValue][i];
        document.forms["ajax"].elements["combo2"].appendChild(option);
    }
}

function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
		try {
			request = new XMLHttpRequest();
		}
		catch (err1) 
		{
			request = false;
		}
            }
        }
    return request;
}

var filetype;
var SelectedFeature ;
var FileCount ;
var checkrandom;
var flag;
var datetime;
function Write(url, content)	// url is the script and data is a string of parameters
{
    if(content!="check")
    {
        var sbmt = document.getElementById("btnsbt");
        var xhr = createXHR();
        xhr.onreadystatechange=function()
        {
            if (xhr.readyState==4 && xhr.status==200)
            {
                sbmt.disabled = false;
                var storing = document.getElementById("storage");
                storing.innerHTML = "<p>Click here to download Files<b><a href='#' id='getdownload' onClick='DownloadFile()'>"+SelectedFeature+"_"+datetime+"</a></b>.";
                document.getElementById("img").innerHTML="";
                document.getElementById("subtn").innerHTML="";
                document.getElementById("image").src = "";

                flag="false";
            }
            else
            {
                if(flag=="true")
                {
                    sbmt.disabled = true;
                    document.getElementById("img").innerHTML="Processing The Files...";
                    document.getElementById("image").src = "C:\\wamp\\www\\Final\\1.gif";
                }
            }
        }
        // alert(url+content);
        xhr.open("GET", url+content, true);
        xhr.send();
    }
    else
    {

        var sbmt = document.getElementById("btnsbt");
        var xhr = createXHR();
        xhr.onreadystatechange=function()
        {
            if (xhr.readyState==4 && xhr.status==200)
            {
                sbmt.disabled = false;
                var storing = document.getElementById("storage");
                storing.innerHTML = "<p>Click here to download Files<b><a href='#' id='getdownload' onClick='DownloadFile()'>"+SelectedFeature+"_"+datetime+"</a></b>.";
                document.getElementById("img").innerHTML="";
                document.getElementById("subtn").innerHTML="";
                document.getElementById("image").src = "";

                flag="false";
            }
            else
            {
                if(flag=="true")
                {
                    sbmt.disabled = true;
                    document.getElementById("img").innerHTML="Processing The Files...";
                    document.getElementById("image").src = "C:\\wamp\\www\\Final\\1.gif";

                }
            }
        }
        // alert(url+content);
        xhr.open("GET", url+content, true);
        xhr.send();
    }
}
function DownloadFile()
{

    var hrefpath="Final/Zip/" + SelectedFeature+"_"+datetime+".zip";
    Write(hrefpath,"check")
    getdownload.href =hrefpath;
    var filepath= SelectedFeature+"_"+datetime+".zip";
    getdownload.download =filepath;

}
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57) )
        return false;

    return true;
}
function submitForm()
{
    getFile();
    var currentdate = new Date();
    datetime = "" + currentdate.getDate() + ""+ (currentdate.getMonth()+1)+ ""+ currentdate.getFullYear() + ""+ currentdate.getHours() +""+ currentdate.getMinutes() + "" + currentdate.getSeconds();
   // alert(datetime);
    flag="true";
    var queryString="";
    filetype = document.getElementById('comb1').value;
    SelectedFeature = document.getElementById('comb2').value;
    FileCount = document.getElementById('filecnt').value;
    checkrandom = document.getElementsByName('random');

    //Validation For All Tools
    if (filetype=="0")
    {
        alert("Please Select FileType");
        return false;
    }
    if (SelectedFeature=="-select-")
    {
        alert("Please Select Feature");
        return false;
    }
    if (FileCount>1000)
    {
        alert("File count should be less than 1000...");
        return false;
    }
    if (FileCount<=0)
    {
        alert("File Count should not be zero and Blank... ");
        return false;
    }

    location.reload();
    queryString = "runFET?id1=1&c1="+filetype+"&c2="+SelectedFeature+"&c3="+FileCount+"&c4=default"+"&c5="+datetime;
    //location.reload();
     alert("Wait.....Downloading Test data...");
    location.href='jenkins1';
    location.href=queryString;
//Write("callperl.php", queryString);
}