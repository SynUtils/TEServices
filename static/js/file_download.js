var arr = new Array();
arr[0] = new Array("-select-");
arr[1] = new Array("Pages","Paragraphs","Sentences","Words","Characters","Sections","Fields","Fields_IncludePicture","Fields_Sequence","Fields_Embed","Fields_Formula","Fields_TOCEntry","Fields_DocInfo","Fields_UserInfo","Endnotes","Footnotes","FormFields",
        "Bookmarks","Headers","Footers","Comments","CustomXmlParts","Hyperlinks","Lists","Shapes","Shapes_Picture","Shapes_LinkedPicture","Shapes_AutoShape","Shapes_Line","Shapes_TextBox","Shapes_Group","Shapes_Callout","Shapes_Media","Shapes_Canvas",
        "Shapes_Diagram","Shapes_EmbeddedOLEObject","Shapes_ShapeTypeMixed","Shapes_TextEffect","Shapes_SmartArt","Shapes_Table","InlineShapes","InlineShapes_Picture","InlineShapes_LinkedPicture","InlineShapes_EmbeddedOLEObject","InlineShapes_Chart",
        "InlineShapes_HorizontalLine","InlineShapes_OLEControlObject","InlineShapes_SmartArt","InlineShapes_ShapeDiagram","InlineShapes_PictureBullet","Styles","Tables","TOC","Indexes");
arr[3] = new Array("Cell_Formatting_Date_Format","Cell_Formatting_Number_Format","Cell_Formatting_Currency_Format","Cell_Formatting_Percentage_Format",	"Cell_Formatting_Text_Horizontal_Left_Align","Cell_Formatting_Text_Horizontal_Right_Align","Cell_Formatting_Text_Horizontal_Centre_Align",
        "Cell_Formatting_Text_Vertical_Top_Align","Cell_Formatting_Text_Vertical_Bottom_Align","Cell_Formatting_Text_Vertical_Centre_Align","Cell_Formatting_Fill_Pattern_Style","Cell_Formatting_Fill_Background_Colour","Charts","Symbols","Pivot_table",
        "Filters","Comments","Formula","Functions","Styles","Sorting","Cell_merge_unmerge","Freeze_panes","Worksheets","Embedded_Objects","Smart ART","Images_Png_Gif","Images_EMF_WMF","Protected_Sheet","Shapes","Table",
        "Hyperlink","HasVBScripts","Forms_Fields","ActiveX_Controls","Conditional_Formatting","Wrap_Text","Hidden_sheet","Merge_Sheet","Page_break",
        "Protected_cell","Cell_Borders");
arr[2] = new Array("Pages","Paragraphs","Sentences","Words","Characters","Sections","Fields","Fields_IncludePicture","Fields_Sequence","Fields_Embed","Fields_Formula","Fields_TOCEntry","Fields_DocInfo","Fields_UserInfo","Endnotes","Footnotes","FormFields",
        "Bookmarks","Headers","Footers","Comments","CustomXmlParts","Hyperlinks","Lists","Shapes","Shapes_Picture","Shapes_LinkedPicture","Shapes_AutoShape","Shapes_Line","Shapes_TextBox","Shapes_Group","Shapes_Callout","Shapes_Media","Shapes_Canvas",
        "Shapes_Diagram","Shapes_EmbeddedOLEObject","Shapes_ShapeTypeMixed","Shapes_TextEffect","Shapes_SmartArt","Shapes_Table","InlineShapes","InlineShapes_Picture","InlineShapes_LinkedPicture","InlineShapes_EmbeddedOLEObject","InlineShapes_Chart",
        "InlineShapes_HorizontalLine","InlineShapes_OLEControlObject","InlineShapes_SmartArt","InlineShapes_ShapeDiagram","InlineShapes_PictureBullet","Styles","Tables","TOC","Indexes");
arr[4] = new Array("Cell_Formatting_Date_Format","Cell_Formatting_Number_Format","Cell_Formatting_Currency_Format","Cell_Formatting_Percentage_Format",	"Cell_Formatting_Text_Horizontal_Left_Align","Cell_Formatting_Text_Horizontal_Right_Align","Cell_Formatting_Text_Horizontal_Centre_Align",
        "Cell_Formatting_Text_Vertical_Top_Align","Cell_Formatting_Text_Vertical_Bottom_Align","Cell_Formatting_Text_Vertical_Centre_Align","Cell_Formatting_Fill_Pattern_Style","Cell_Formatting_Fill_Background_Colour","Charts","Symbols","Pivot_table",
        "Filters","Comments","Formula","Functions","Styles","Sorting","Cell_merge_unmerge","Freeze_panes","Worksheets","Embedded_Objects","Smart_ART","Images_Png_Gif","Images_EMF_WMF","Protected_Sheet","Shapes","Table",
        "Hyperlink","HasVBScripts","Forms_Fields","ActiveX_Controls","Conditional_Formatting","Wrap_Text","Hidden_sheet","Merge_Sheet","Page_break",
        "Protected_cell","Cell_Borders");

arr[5] = new Array("Animations","Comments","Embedded_Objects","Embedded_Objects_Charts","Fonts_Font_Effects","Headers_Footers","Hyperlinks","Images_EMF_WMF","Images_PNG_GIF_JPG","Shapes","Shapes_3D_Effects","Shapes_Fills","Shapes_Freeform","Shapes_Other_Effects",
        "Slide_Backgrounds","SmartArt","Speaker_Notes","Tables","Text_Box","Themes","Transitions","Lists_Numeric","Fonts","Lists_Character","Lists_Picture","Group_shapes","Hidden_Slides");
arr[6] = new Array("Animations","Comments","Embedded_Objects","Embedded_Objects_Charts","Fonts_Font_Effects","Headers_Footers","Hyperlinks","Images_EMF_WMF","Images_PNG_GIF_JPG","Shapes","Shapes_3D_Effects","Shapes_Fills","Shapes_Freeform","Shapes_Other_Effects",
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

var flag;
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

var showLoadingImage = function() {
	var contentDiv = document.getElementById('contentDiv');
	contentDiv.className='contentDivLoading';
	
	var loadingImage = document.getElementById('loadingImage');
	loadingImage.style.display='inline';
	loadingImage.className='loadingDiv';
};

var validateForm = function() {
   var fileType = document.getElementById('comb1').value;
   var selectedFeature = document.getElementById('comb2').value;
   var fileCount = document.getElementById('filecnt').value;
   var emailID = document.getElementById('exampleInputEmail1').value;
//    checkrandom = document.getElementsByName('random');
   var baseBuild = document.getElementById("id_docfile").value;
   var compareBuild = document.getElementById("id_compare_build").value;
   
   if (fileType != 0 && 
		   selectedFeature != "" && 
		   fileCount != "" && 
		   emailID != "" &&
		   baseBuild != "" &&
		   compareBuild != "")
   {
	   if (fileCount < 1 || fileCount > 1000)
	   {
		   alert("file count must be between 1 and 1000.")
		   return false;
	   }
	   return true;
   }
   else{
   		   alert("You are requested to fill all fields !");	
	 	   return false;

	   }
   
};

function submitForm()
{
	if (validateForm() == true){
		showLoadingImage()
	}
	else{
		return false;
	}
}






