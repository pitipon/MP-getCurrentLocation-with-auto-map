const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext(`map`, this);
    
  },
  onReady: function () {
    this._hanldeLocation();
  },
  locating: false,
  locationCount: 0,
  _hanldeLocation: function () {
    if (this.mapCtx) {
      if (!this.locating) {
        wx.showLoading({
          title: 'Get Location',
          mask: true
        })
      }
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          console.log(res);
          if (res.latitude && res.longitude) {
            this.mapCtx.moveToLocation();
            wx.hideLoading();
            this.locating = false;
            this.locationCount = 0;
          } else {
            console.log(res);
            if (this.locationCount < 5) {
              this.locationCount++;
              this._hanldeLocation();
            } else {
              this.locationCount = 0;
              wx.hideLoading();
              this.locating = false;
              wx.showToast({
                title: 'Failed to get location, please try again',
                icon: 'none'
              })
            }

          }
        },
        fail: err => {
          wx.hideLoading();
          this.locating = false;
          wx.showToast({
            title: 'Failed to get location, please try again',
            icon: 'none'
          })
        }
      });
    }
  },
})
