/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview JELTE TODO WRITE ME
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

define([
  'http://localhost:9876/client/tester.js',
  'http://localhost:9876/client/comms.js',
  'http://localhost:9876/c2cTests/capture/captureFactory.js',
  'qowtRoot/controls/document/document',
  'qowtRoot/models/env',
  'qowtRoot/pubsub/pubsub',
  'qowtRoot/models/fileInfo'
], function(
    Tester,
    Comms,
    CaptureFactory,
    Document,
    EnvModel,
    PubSub,
    FileInfo) {

  'use strict';

  Tester.register({

    // name for my test (MUST BE UNIQUE OR IT WONT LOAD)
    name: 'C2C Image comparison test',

    // the qowt event which will trigger this test
    signal: 'qowt:contentComplete',

    // array of glob patterns which, when a testFile matches
    // will ensure this test is run. Notice the final wildcard
    // which ensures this test will be run for both doc and docx files!
    matches: [
      '**/c2cTests/testFiles/**/*.doc*',
      '**/c2cTests/testFiles/**/*.ppt*',
      '**/c2cTests/testFiles/**/*.xls*'
    ],

    // and finally specify our actual Jasmine test
    spec: function() {

      describe('rendering', function() {

        // TODO(jliebrand): need to think of a clever way to do this
        // such that it still works when allow-same-origin is turned off
        // Probably have to do an async message on the bus to the app
        // to take the picture, and wait for a msg to come back

        var _currImgIdx , _comparisonDone, mismatchArr = [];
        var _needRetry = true;
        var _isBaseImageAvailable = false;
        var _captureInstance, _blessedData,comparedata;
        

        var emptyDataUrl = 'data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEUAAACnej3' +
            'aAAAAAXRSTlMAQObYZgAAAA1JREFUeNoBAgD9/' +
            'wAAAAIAAVMrnDAAAAAASUVORK5CYII=';

        /**
         * Check if we are done with comparing images for file.
         */
        function comparisonDone() {
          return _comparisonDone !== undefined;
        }

        /**
         * @private
         * Compare two images data
         * @param {object} baseImage blessed image data
         * @param {object} newImage current image data
         */
        function _resembleImages(baseImage, newImage) {
          var isEmpty = false;
          if (newImage === emptyDataUrl||baseImage === undefined) {
            isEmpty = true;
          }
          // Use blank image for comparison instead of undefined/invalid.
          baseImage = baseImage || emptyDataUrl;
          newImage = newImage || emptyDataUrl;
          window.resemble(baseImage).compareTo(newImage).ignoreAntialiasing().onComplete(
              function(data) {
                
                var url = FileInfo.originalURL; 
                var extn = url.split('.').pop();
                // Save current data and diff data
                // only if considerable difference is present.
                if (1 || parseFloat(data.misMatchPercentage) > 0.1) {
                  //Modified for correct result on console: Earlier mismatchArr.length =0 :go only if thereis Diff 
                   mismatchArr[(_currImgIdx.toString().split('_'))[0]] = data.misMatchPercentage;
                  var diffUrl = data.getImageDataUrl();
                  var diffVal = 'lt50';
                  if (100 - data.misMatchPercentage > 99.9) {
                    //Will reach here only when, we want to save matching images
                    diffVal = 'match';
                  } else if (100 - data.misMatchPercentage > 95) {
                    diffVal = '95to99';
                  } else if (100 - data.misMatchPercentage > 85) {
                    diffVal = '85to95';
                  } else if (100 - data.misMatchPercentage > 70) {
                    if (_needRetry === true && isEmpty === false) {
                      _needRetry = false;
                      _captureInstance.captureScreen();
                      return;
                    } else {
                      diffVal = '70to85';
                      _needRetry = true;
                    }
                  } else if (100 - data.misMatchPercentage > 50) {
                    if (_needRetry === true && isEmpty === false) {
                      _needRetry = false;
                      return;
                    } else {
                      diffVal = '50to70';
                      _needRetry = true;
                    }
                  }
                  // save difference image
                  Comms.send('diff image', {
                    fileName: decodeURI(url),
                    image: _currImgIdx + 1,
                    data: diffUrl,
                    diff: diffVal,
                    ext: extn
                  });
                  // save current data
                  Comms.send('compare image', {
                    fileName: decodeURI(url),
                    image: _currImgIdx + 1,
                    data: newImage,
                    ext: extn
                  });
                }
                _captureInstance.moveNext();
              });
        }

        /**
         * callback called when current screen in captured.
         * @param {integer} index index current index of document
         * @param {object} data captured data
         * @private
         */
        function _capturedCallback(index, data) {
          if (data === 'data:,') {
            data = emptyDataUrl;
          }
          _currImgIdx = index;
          comparedata = data;
          getBlessedImage(_currImgIdx);
          //commeneted as Flow has been changed
         // _resembleImages(_blessedData, data);
        }

        /**
         * callback when control moves to next entity.(page/sheet/slide)
         * @param {integer} index current index of document.
         * -1 implies we have reached end.
         * @private
         */
        function _navigateCallback(index) {
          if (index !== -1) {
            //as per the new processFlow
            _captureInstance.captureScreen();
            //commented as per the new flow
            //getBlessedImage(_currImgIdx);
          } else if (_isBaseImageAvailable === true) {
            // continue if blessed images are available
            // commented as per the new process flow
            //getBlessedImage(++_currImgIdx, false);
          } else {
            // we are done for this file
            _comparisonDone = true;
            //commeneted by sheetal: for new flow change
            //getBlessedImage(++_currImgIdx);
          }
        }


      /*   Comms.on('get pizzatester image', function() {
            saveBlessed = true;
            pizzatester = true;
          console.log(saveBlessed);
          });*/

        /**
         * Listener for blessed image from Monkey server
         */
        Comms.on('blessed image', function(data) {
          // Check if current image is last available base image.
          // Number of images can differ due to formatting or pagination.
          _isBaseImageAvailable = data.isLastImage === false;
          // Check if new images is available.
          var isNewImage = data.newImage !== undefined ? data.newImage : true;
          _blessedData = data.dataUrl;
          
          window.setTimeout(function() {
            if (0 && isNewImage) {
              _captureInstance.captureScreen();
            } else {
              // Capture not required as no new image/data is available.
              _resembleImages(data.dataUrl, comparedata);
            }
          }, 500);
        });

        // Request Blessed image for first page/slide
        _currImgIdx = 0;
        var pizzatester;
        var url = FileInfo.originalURL;
        _captureInstance = CaptureFactory.getCaptureInstance(url.split('.').pop(),pizzatester);
        _captureInstance.registerCallbacks(_capturedCallback, _navigateCallback);

        //modified after Amol's suggestion for  increasing timeout for 1st sheet
        window.setTimeout(function() {
                _captureInstance.captureScreen();
            }, 1000);
        //_captureInstance.captureScreen();
        /**
         * Requests blessed image for current page/slide.
         * Blesses data is stored as
         * blessedImages/$(file)_extn/$(file)_slide_pageNum.png
         * @param {object} imgIdx index of current slide or page
         * @param {object} isNewImageAvailable newImage
         */
        function getBlessedImage(imgIdx, isNewImageAvailable) {
          var url = FileInfo.originalURL;
          // get extension of file
          var extn = url.split('.').pop();
          // get filename excluding extension.
          // filename can have multiple '.'
          var fName = url.split('/').pop().split('.');
          var fileName = fName[0];
          for (var idx = 1; idx < fName.length - 1; idx++) {
            fileName += '.' + fName[idx];
          }
          // location will be blessedImages/filename_extn/filename_idx.png
          var dirToRead = '/blessedImages/' + fileName + '_' + extn;
          var readFrom =
              dirToRead + '/' + fileName + '_image_' + (imgIdx + 1) + '.png';

          // Request Monkey server for blessed image of current page/slide
          Comms.send('get blessed', {
            fileName: decodeURI(readFrom),
            idx: imgIdx + 1,
            newImage: isNewImageAvailable,
            url: url,
            ext: extn
          });
        }

        beforeEach(function() {
        });

        afterEach(function() {
        });

        it('should match blessed image', function() {
          waitsFor(comparisonDone, 'compare', 6000000);
          runs(function() {
            var arrLen = mismatchArr.length || 0;
            for (var i = 0; i < arrLen; i++) {
              // get mismatchPercentage
              var misMatchFloat = parseFloat(mismatchArr[i]);
              expect(misMatchFloat).toBeLessThan(0.1);
              
            }
          });
        });

      });
    }
  });
});
