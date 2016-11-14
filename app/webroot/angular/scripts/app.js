! function() {
    "use strict";
    angular.module("golan", ["ngAnimate", "ngCookies", "ngTouch", "ngSanitize", "ui.router", "ui.bootstrap", "slick", "uiGmapgoogle-maps", "perfect_scrollbar", "angular-loading-bar", "ui-notification", "flow", "httpPostFix", "ngPromiseExtras"])
}(),
function() {
    "use strict";

    function e(e, t, n, a, i, s, o, r) {
        var l = a.get(),
            c = function(t) {
                return t ? (e.userInfo = t, d(t), void(e.scopeLoading = !0)) : !1
            },
            d = function(t) {
                e.formFields = {
                    name: t.name,
                    description: t.description,
                    email: t.email,
                    login: t.login
                }
            };
        e.projects = l.projects, e.userProjects = [], e.userLoggedIn = !1, e.userInfo = {}, e.scopeLoading = !1, e.loading = !1, e.success = !1, e.uploader = {}, e.saveProfile = function() {
            if (angular.forEach(e.profileEdit.$error.required, function(e) {
                    e.$setDirty()
                }), e.profileEdit.$valid && !e.profileEdit.$untouched) {
                var t = {};
                angular.forEach(e.formFields, function(t, n) {
                    e.profileEdit[n] && !e.profileEdit[n].$pristine && e.profileEdit[n].$touched && (this["user[" + n + "]"] = t)
                }, t), e.uploader.flow && e.uploader.flow.files.length && (t.file = e.uploader.flow.files[0].file), angular.equals({}, t) ? e.loading = !1 : (e.loading = !0, n.editUser(e.userInfo.login, t).then(function() {
                    e.loading = !1, e.success = !0, o.success("פרופיל נשמר בהצלחה"), r.$broadcast("loginChanged", !0), i.go("user.obs")
                }, function() {
                    e.loading = !1, o.error("השמירה נכשלה")
                }))
            }
        }, c(s), e.$on("loginChanged", function(t, a) {
            a ? n.getUserInfo().then(function(t) {
                e.userInfo = t
            }) : i.go("user.obs")
        })
    }
    e.$inject = ["$scope", "$window", "AuthService", "Globals", "$state", "userInfo", "Notification", "$rootScope"], angular.module("golan").controller("ProfileCtrl", e)
}(),
function() {
    "use strict";

    function e() {
        return {
            restrict: "E",
            scope: !0,
            bindToController: {
                comments: "="
            },
            controller: ["$scope", function(e) {}],
            controllerAs: "comments",
            templateUrl: "app/pages/obs/single/comments/comment.html"
        }
    }

    function t(e, t) {
        var n = function(n) {
            var a = this,
                i = function() {
                    a.show = !1, t.getUserInfo().then(function(e) {
                        e.id !== a.comment.user_id && (a.show = !0)
                    })
                };
            a.show = !1, a.loading = !1, i(), a.send = function() {
                a.loading = !0;
                var t = {
                    parent: a.comment.observation_id,
                    specie: a.comment.taxon_id
                };
                e.inat.identification(t).then(function(e) {
                    a.loading = !1, n.$emit("updateItem")
                }, function(e) {
                    alert("שגיאה בשמירת הזיהוי"), console.log(e), a.loading = !1
                })
            }, n.$on("loginChanged", i)
        };
        return n.$inject = ["$scope"], {
            restrict: "E",
            scope: !0,
            bindToController: {
                comment: "="
            },
            controller: n,
            controllerAs: "agree",
            template: '<button class="btn btn-xs btn-success" ng-click="agree.send()" ng-if="agree.show">מסכים לזיהוי<span ng-show="agree.loading" class="padding-right-5"><i class="fa fa-spinner fa-spin "></i></span></button>'
        }
    }

    function n(e, t) {
        var n = function(n) {
            var a = this,
                i = function() {
                    a.show = !1, t.getUserInfo().then(function(e) {
                        e.id === a.comment.user_id && (a.show = !0)
                    })
                };
            a.show = !1, a.loading = !1, i(), a.submit = function() {
                a.loading = !0, e.cake.deleteIdentification(a.comment.id).then(function() {
                    a.loading = !1, n.$emit("updateItem")
                })
            }, n.$on("loginChanged", i)
        };
        return n.$inject = ["$scope"], {
            restrict: "E",
            scope: !0,
            bindToController: {
                comment: "="
            },
            controller: n,
            controllerAs: "remove",
            template: '<button class="btn btn-xs btn-danger" ng-click="remove.submit()" ng-if="remove.show">הסר זיהוי<span ng-show="remove.loading"><i class="fa fa-spinner fa-spin"></i></span></button>'
        }
    }
    t.$inject = ["restApi", "AuthService"], n.$inject = ["restApi", "AuthService"], angular.module("golan").directive("comments", e).directive("commentAgree", t).directive("removeIdentification", n)
}(),
function() {
    "use strict";

    function e(e, t) {
        var n = function(n) {
            var a = this;
            a.cece = function() {
                console.log("ddd"), console.log(a.commentForm)
            }, a.show = !1, a.loading = !1, a.comment = {
                type: "comment",
                parent: a.parent
            };
            var i = function() {
                a.show = !1, t.getUserInfo().then(function() {
                    a.show = !0
                })
            };
            i(), a.send = function(t) {
                a.loading = !0, angular.forEach(t.$error.required, function(e) {
                    e.$setDirty()
                }), t.$valid ? (null === a.comment.specie && (a.comment.type = "comment"), e.inat[a.comment.type](a.comment).then(function() {
                    a.loading = !1, a.comment.body = null, a.comment.specie = null, a.activeTaxa = null, a.commentForm.$setPristine(), n.$emit("updateItem")
                }, function() {
                    a.loading = !1, alert("שגיאה בשליחה הודעה")
                })) : a.loading = !1
            }, n.$on("loginChanged", i)
        };
        return n.$inject = ["$scope"], {
            restrict: "E",
            scope: !0,
            bindToController: {
                parent: "@"
            },
            controller: n,
            controllerAs: "addComment",
            templateUrl: "app/pages/obs/single/comments/addComment.html"
        }
    }
    e.$inject = ["restApi", "AuthService"], angular.module("golan").directive("obAddComment", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i) {
        var s = t.id;
        e.userInfo = i, e.mapOptions = {
            zoom: 13,
            options: {
                scrollwheel: !1
            }
        }, e.item = {}, e.similars = [], e.loading = !0, e.showLargeImage = function(t) {
            if (!angular.isDefined(e.item.observation_photos[t])) return !1;
            var n = a.open({
                template: '<i class="fa fa-times-circle close" ng-click="close()"></i><p>{{title}}</p><img ng-src="{{img.photo.large_url}}"><p class="license tar text-muted">רישיון תמונה: {{license}}</p>',
                controller: "obModalCtrl",
                windowClass: "img-modal",
                size: "lg",
                resolve: {
                    item: function() {
                        return {
                            img: e.item.observation_photos[t],
                            item: e.item
                        }
                    }
                }
            });
            n.result.then()
        }, e.filterFileds = function(e) {
            return "לא ידוע" !== e.value
        };
        var o = function() {
                n.obs.similar({
                    item: e.item
                }).then(function(t) {
                    e.loading = !1, e.similars = t.items
                })
            },
            r = function() {
                e.item = null, e.loadingItems = !0, e.slideReady = !1, l = 0, n.obs.single({
                    id: s
                }).then(function(t) {
                    e.item = t.items, e.item.ccInfo.discussion = e.item.identifications.concat(e.item.comments), e.item.ccInfo.useLargeIcon = !0, o(), e.item.latitude && (e.mapOptions.zoom = 1, e.mapOptions.center = {
                        lat: e.item.latitude,
                        lng: e.item.longitude
                    })
                }, function(e) {
                    console.log("Error: ", e)
                })
            },
            l = 0;
        e.imgLoad = function() {
            l++, (l === 2 * e.item.observation_photos.length || 1 === e.item.observation_photos.length) && ($(".nav-gallery").slick({
                slidesToShow: 3,
                arrows: !1,
                slidesToScroll: 1,
                asNavFor: ".main-gallery",
                centerMode: !0,
                focusOnSelect: !0
            }), $(".main-gallery").slick({
                arrows: !1,
                adaptiveHeight: !0
            }), e.slideReady = !0)
        }, r(), e.$on("addDisction", function(t, n) {
            var a = {
                id: i.id,
                login: i.login,
                name: i.name,
                user_icon_url: i.user_icon_url
            };
            n.user = a, e.item.ccInfo.discussion.push(n)
        }), e.$on("CCImagesLoaded", r), e.$on("updateItem", r)
    }

    function t(e, t, n) {
        var a = function(a, i) {
            var s = this,
                o = function() {
                    s.show = !1, t.getUserInfo().then(function(e) {
                        e.id === s.item.user_id && (s.show = !0)
                    })
                };
            s.show = !1, s.loading = !1, o(), s.submit = function() {
                s.loading = !0;
                var t = n.open({
                    controller: ["$scope", "$uibModalInstance", function(e, t) {
                        e.ok = t.close, e.cancel = t.dismiss
                    }],
                    template: '<div class="modal-header"><h4 class="modal-title">האם באמת ברצונך למחוק תצפית זו? </h4></div><div class="modal-body">כל המידע הקשור אליה יימחק גם כן, ללא אפשרות לשחזור.</div><div class="modal-footer"><button class="btn btn-default" type="button" ng-click="cancel()">ביטול</button><button class="btn btn-danger" type="button" ng-click="ok()">מחק</button></div>'
                });
                t.result.then(function() {
                    e.cake.deleteOb(s.item.id).then(function() {
                        s.loading = !1, i.go("home")
                    })
                })
            }, a.$on("loginChanged", o)
        };
        return a.$inject = ["$scope", "$state"], {
            restrict: "E",
            scope: !0,
            bindToController: {
                item: "="
            },
            controller: a,
            controllerAs: "deleteOb",
            template: '<button class="btn btn-sm btn-danger" ng-click="deleteOb.submit()" ng-if="deleteOb.show">מחיקת תצפית</button>'
        }
    }

    function n(e) {
        var t = function(t) {
            var n = this,
                a = function() {
                    n.show = !1, e.getUserInfo().then(function(e) {
                        e.id === n.item.user_id && (n.show = !0)
                    })
                };
            n.show = !1, a(), t.$on("loginChanged", a)
        };
        return t.$inject = ["$scope"], {
            restrict: "E",
            scope: !0,
            bindToController: {
                item: "="
            },
            controller: t,
            controllerAs: "editOb",
            template: '<button class="btn btn-sm btn-primary" ui-sref="obs.edit({id: editOb.item.id})" ng-if="editOb.show">עריכה</button>'
        }
    }

    function a(e, t, n) {
        e.img = n.img, e.title = n.item.ccInfo.name, e.license = n.img.photo.license_code, e.close = function() {
            t.dismiss("cancel")
        }
    }
    e.$inject = ["$scope", "$stateParams", "restApi", "$uibModal", "userInfo"], a.$inject = ["$scope", "$uibModalInstance", "item"], t.$inject = ["restApi", "AuthService", "$uibModal"], n.$inject = ["AuthService"], angular.module("golan").controller("ObCtrl", e).controller("obModalCtrl", a).directive("deleteOb", t).directive("editOb", n)
}(),
function() {
    "use strict";

    function e(e) {
        e.put("template/timepicker/timepicker.html", '<table>\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="fa fa-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="fa fa-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}">\n      </td>\n      <td>:</td>\n      <td class="form-group" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-focus="add.setFocus(2)">\n      </td>\n      <td ng-show="showMeridian"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="fa fa-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="fa fa-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')
    }

    function t(e) {
        function t() {
            var t = [];
            return angular.forEach(e.project_observations, function(e) {
                this.push(e.project_id)
            }, t), t
        }

        function n() {
            return e.taxon ? e.taxon.default_name.name : void 0
        }
        return {
            id: e.id,
            date: e.observed_on,
            description: e.description,
            latitude: e.latitude ? parseFloat(e.latitude) : null,
            longitude: e.longitude ? parseFloat(e.longitude) : null,
            geoprivacy: e.geoprivacy ? e.geoprivacy : "open",
            projects: t(),
            taxon_id: e.taxon_id,
            species_guess: n()
        }
    }

    function n(e, n, a, i, s, o, r, l) {
        var c = this,
            d = s.get(),
            u = [],
            p = d.projects;
        c.test = function() {
            alert("asd")
        };
        var m = function(e) {
                var t = null;
                return angular.forEach(p, function(n) {
                    parseInt(n.id) === e && (t = n)
                }), t
            },
            g = function() {
                i.userAllProjects().then(function(e) {
                    angular.forEach(e, function(e) {
                        var t = m(e.project_id);
                        t && (e.smart_flag = parseInt(t.smart_flag), e.smart_flag > 0 && c.ob.projects.push(e.project_id)), this.push(e)
                    }, c.userProjects)
                })
            };
        l.$on("mapItemDraged", function(t, n) {
            e.$apply(function() {
                c.setFocus(3), c.ob.longitude = n.longitude, c.ob.latitude = n.latitude
            })
        }), c.loadedImages = [], c.userProjects = [], g(), c.projOrder = function(e) {
            return -1 * d.defaultProjects.indexOf(parseInt(e.project.id))
        }, c.uploader = {}, c.activePanel = 1, c.datePicker = {
            options: {},
            isOpen: !1,
            maxDate: new Date
        }, n ? (c.ob = t(n), u = c.ob.projects.slice(), n.observation_photos && (c.loadedImages = n.observation_photos)) : c.ob = {
            date: (new Date).setMinutes(0),
            latitude: 33.010636,
            longitude: 35.758098,
            projects: [],
            description: null,
            taxon_id: null,
            species_guess: null,
            geoprivacy: "open"
        }, c.mapOptions = {
            zoom: 10,
            center: {
                lat: c.ob.latitude,
                lng: c.ob.longitude
            },
            options: {
                scrollwheel: !1
            }
        }, c.setFocus = function(e) {
            99 === e ? c.activePanel++ : c.activePanel = e
        }, c.toggleProject = function(e) {
            return c.setFocus(5), e.smart_flag && 2 === e.smart_flag ? !1 : void(-1 === c.ob.projects.indexOf(e.project.id) ? c.ob.projects.push(e.project.id) : c.ob.projects.splice(c.ob.projects.indexOf(e.project.id), 1))
        }, c.isActive = function(t) {
            return -1 !== e.ob.projects.indexOf(t.id)
        }, c.updateMarker = function() {
            c.map.marker.coords = {
                latitude: c.ob.latitude,
                longitude: c.ob.longitude
            }
        }, c.send = function() {
            var e = "addOb";
            c.ob.id && (e = "editOb", c.ob.projectsToAdd = [], angular.forEach(c.ob.projects, function(e) {
                -1 === u.indexOf(e) && this.push(e)
            }, c.ob.projectsToAdd), c.ob.projectsToRemove = [], angular.forEach(u, function(e) {
                -1 === c.ob.projects.indexOf(e) && this.push(e)
            }, c.ob.projectsToRemove)), c.ob.taxon_id && (c.ob.species_guess = null), c.ob.observed_on_string = o("date")(c.ob.date, "yyyy-MM-dd HH:mm"), a.inat[e](c.ob, c.uploader.flow.files).then(function(e) {
                r.go("obs.single", {
                    id: e.id
                })
            }, function() {})
        }
    }
    e.$inject = ["$templateCache"], n.$inject = ["$scope", "item", "restApi", "AuthService", "Globals", "$filter", "$state", "$rootScope"], angular.module("golan").run(e).controller("AddObController", n).directive("fileModel", ["$parse", function(e) {
        return {
            restrict: "A",
            link: function(t, n, a) {
                var i = e(a.fileModel),
                    s = i.assign;
                n.bind("change", function() {
                    t.$apply(function() {
                        s(t, n[0].files[0])
                    })
                })
            }
        }
    }])
}(),
function() {
    "use strict";

    function e(e) {
        var t = function(t) {
            t.items = null;
            var n = function() {
                e.cake.links().then(function(e) {
                    t.items = e
                }, function() {})
            };
            t.text = "", e.cake.texts("links").then(function(e) {
                t.text = e
            }), n()
        };
        return {
            scope: {},
            link: t,
            templateUrl: "app/pages/info/links/links.html"
        }
    }
    e.$inject = ["restApi"], angular.module("golan").directive("linksList", e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("user.obs", {
            url: "",
            controller: "UserObsController",
            templateUrl: "app/pages/users/partials/user.obs.html"
        }).state("user.projects", {
            url: "/projects",
            templateUrl: "app/pages/projects/index.html",
            controller: "ProjectsIndexController"
        }).state("user.password", {
            url: "/password",
            templateUrl: "app/pages/users/partials/profile/user.password.html",
            controller: "ProfileCtrl",
            resolve: {
                userInfo: ["$q", "AuthService", "globalData", "$state", function(e, t, n, a) {
                    t.onLoadStatus().then(function(e) {
                        i.resolve(e)
                    }, function() {
                        i.reject({
                            type: 1,
                            redirect: function(e) {
                                a.go("user.password", {
                                    slug: e.login
                                })
                            },
                            notify: "כדי להחליף סיסמא יש להתחבר קודם"
                        })
                    });
                    var i = e.defer();
                    return i.promise
                }]
            }
        }).state("user.profile", {
            url: "/profile",
            templateUrl: "app/pages/users/partials/profile/user.profile.html",
            controller: "ProfileCtrl",
            resolve: {
                userInfo: ["$q", "AuthService", "globalData", "$state", function(e, t, n, a) {
                    t.onLoadStatus().then(function(e) {
                        i.resolve(e)
                    }, function() {
                        i.reject({
                            type: 1,
                            redirect: function(e) {
                                a.go("user.profile", {
                                    slug: e.login
                                })
                            },
                            notify: "על מנת לערוך את הפרופיל משתמש, יש להתחבר למערכת קודם"
                        })
                    });
                    var i = e.defer();
                    return i.promise
                }]
            }
        })
    }

    function t(e, t, n, a) {
        var i = t.slug;
        e.user = null, e.showUserMenu = !1, e.userProjects = null;
        var s = function() {
                n.users.getUserProjects({
                    userSlug: i
                }).then(function(t) {
                    e.userProjects = t
                })
            },
            o = function() {
                n.users.getSingle({
                    userSlug: i
                }).then(function(t) {
                    e.user = t, a && a.login === i && (e.showUserMenu = !0), a && s()
                }, function() {
                    e.showUserMenu = !1
                })
            };
        o(), e.$on("loginChanged", function(t, n, i) {
            e.userLoggedIn = n, n ? (a = i, o()) : e.showUserMenu = !1
        })
    }

    function n(e, t, n) {
        var a = t.slug,
            i = function() {
                n.obs.item.get({
                    cache: !1,
                    id: a,
                    page: e.pagOptions.currentPage,
                    perPage: e.pagOptions.perPage
                }).then(function(t) {
                    e.items = t.items, e.pagOptions.totalItems = t.total
                }, function() {})
            };
        e.pagOptions = {
            currentPage: 1,
            totalItems: 0,
            perPage: 15,
            pageChanged: function() {
                i()
            }
        }, e.items = [], i()
    }
    e.$inject = ["$stateProvider"], t.$inject = ["$scope", "$stateParams", "restApi", "userInfo"], n.$inject = ["$scope", "$stateParams", "restApi"], angular.module("golan").config(e).controller("UsersController", t).controller("UserObsController", n)
}(),
function() {
    "use strict";

    function e(e, t) {
        return {
            templateUrl: "app/pages/register/register-form.html",
            controller: ["$scope", "$state", function(n, a) {
                n.userLoggedIn = !1, n.loading = !1, n.user = {
                    email: null,
                    description: null,
                    login: null,
                    password: null,
                    name: null
                }, e.getUserInfo().then(function() {
                    n.userLoggedIn = !0
                }), n.save = function(i) {
                    n.errors = null, angular.forEach(i.$error.required, function(e) {
                        e.$setDirty()
                    }), i.$valid && !i.$untouched && (n.loading = !0, e.registerUser(n.user).then(function() {
                        n.loading = !1, n.success = !0, t.success("פרופיל נשמר בהצלחה"), a.go("home")
                    }, function(e) {
                        n.loading = !1, n.errors = e.errors, t.error("הרשמה נכשלה")
                    }))
                }
            }]
        }
    }

    function t(e, t) {
        return {
            require: "ngModel",
            scope: {},
            link: function(n, a, i, s) {
                var o = {
                    loadingBar: !1,
                    userSlug: null
                };
                s.$asyncValidators.backCheckEmpty = function(n) {
                    if (n) {
                        var a = e.defer();
                        o.userSlug = n, t.users.getSingle(o).then(function() {
                            a.reject()
                        }, function() {
                            a.resolve()
                        })
                    }
                    return a.promise
                }
            }
        }
    }
    e.$inject = ["AuthService", "Notification"], t.$inject = ["$q", "restApi"], angular.module("golan").directive("registerForm", e).directive("backCheckEmpty", t)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("projects.list", {
            url: "",
            controller: "ProjectsIndexController",
            templateUrl: i + "index.html"
        }).state("projects.single", {
            url: "/view/:slug",
            templateUrl: i + "single.html",
            controller: "ProjectsCtrl",
            resolve: {
                slug: ["$q", "restApi", "$stateParams", function(e, t, n) {
                    var a = e.defer();
                    return isNaN(n.slug) ? a.resolve(n.slug) : t.projects.getSlugById(n.slug).then(function(e) {
                        a.resolve(e)
                    }), a.promise
                }]
            }
        }).state("projects.single.gallery", {
            parent: "projects.single",
            url: "/:gallery",
            template: '<items-gallery items="items"></items-gallery>'
        }).state("projects.single.list", {
            parent: "projects.single",
            url: "/:list",
            template: '<items-list items="items" class="no-bg two-lists"></items-list>'
        })
    }

    function t(e, t, n, a, i, s, o, r) {
        var l = a.get();
        e.loadingItems = !0, e.q = "", e.project = null, e.items = [], e.mapOptions = {
            zoom: 10,
            options: {
                scrollwheel: !1
            }
        }, e.itemsMarkers = [], e.currentPage = 1, e.userInProject = !1, e.projectMembers = null, e.pagOptions = {
            currentPage: 1,
            totalItems: 0,
            perPage: 30,
            pageChanged: function() {
                d()
            }
        }, e.projectCashedInfo = null, e.$on("activeProject", function() {});
        var c = function(t) {
                for (var a = 0, i = l.projects.length; i > a; a++)
                    if (l.projects[a].slug === t) {
                        n.activeProject = l.projects[a], e.projectCashedInfo = l.projects[a], n.$broadcast("activeProject");
                        break
                    }
            },
            d = function() {
                e.loadingItems = !0, t.obs.project.get({
                    project: r,
                    q: e.q,
                    page: e.pagOptions.currentPage,
                    perPage: e.pagOptions.perPage
                }).then(function(t) {
                    e.loadingItems = !1, e.items = t.items, e.pagOptions.totalItems = e.totalItems = t.total
                }, function(e) {
                    console.log("Error: ", e)
                })
            },
            u = function() {
                c(r), t.projects.get({
                    project: r
                }).then(function(t) {
                    e.project = t, p(), angular.isDefined(t.latitude) && (e.mapOptions.center = {
                        lat: t.latitude,
                        lng: t.longitude
                    })
                }, function(e) {
                    console.log("Error", e)
                })
            },
            p = function() {
                t.projects.members({
                    projectId: e.project.id,
                    per_page: 12
                }).then(function(t) {
                    e.projectMembers = {
                        total: t.total_results,
                        items: t.results
                    }
                }, function(e, t, n) {
                    console.log(e, t, n)
                })
            };
        e.search = function() {
            e.pagOptions.currentPage = 1, d()
        }, e.clearSearch = function() {
            e.q = null, e.pagOptions.currentPage = 1, d()
        }, d(), u();
        var m = function(t, n) {
            e.loggedIn = n, n ? (e.userLoggedIn = !0, i.userInProject(e.project.slug).then(function(t) {
                e.userInProject = t
            }), i.userInProject(e.project.slug).then(function(t) {
                e.userInProject = t
            })) : (e.userInProject = !1, e.userLoggedIn = !1)
        };
        o(function() {
            s && m(null, !0)
        }), e.userInProject = !1, e.userLoggedIn = !1, e.joinProject = function() {
            return angular.isDefined(e.project.id) ? void i.addUserToProject(e.project.id).then(function() {
                e.userInProject = !0
            }, function() {}) : !1
        }, e.leaveProject = function() {
            return angular.isDefined(e.project.id) ? void i.removeUserFromProject(e.project.id).then(function() {
                e.userInProject = !1
            }, function() {}) : !1
        }, e.$on("loginChanged", m)
    }

    function n(e, t, n, a, i) {
        var s = function() {
            var t = n.get(),
                i = [];
            e.projects = t.projects, a.userAllProjects().then(function(t) {
                e.userProjects = t, i = [], angular.forEach(t, function(e) {
                    this.push(e.project_id), e.project.ccUserSingTo = !0
                }, i);
                var n = [];
                angular.forEach(e.projects, function(e) {
                    -1 === i.indexOf(parseInt(e.id)) && (e.ccUserSingTo = !1, e.ccUserLoggedIn = !0, this.push(e))
                }, n), e.projects = n
            }, function() {
                e.userProjects = !1, angular.forEach(t.projects, function(e) {
                    e.ccUserSingTo = !1, e.ccUserLoggedIn = !1
                })
            })
        };
        e.showTitle = !0, "/projects" === i.current.url && (e.showTitle = !1), e.userProjects = null, s(), e.$on("refreshProjects", function() {
            s()
        }), e.$on("loginChanged", s)
    }

    function a(e, t, n, a, s) {
        var o = function(n, i, o) {
            n.noProjNotice = o.errorNotice;
            var r = a.get().defaultProjects,
                l = a.get().projects,
                c = function(e) {
                    var t = null;
                    return angular.forEach(l, function(n) {
                        parseInt(n.id) === e && (t = n)
                    }), t
                };
            n.showActions = function(e) {
                return -1 === r.indexOf(parseInt(e.id))
            }, n.list = [];
            var d = function(e) {
                if (n.list = e, n.list[0] && n.list[0].project) {
                    var t = [];
                    angular.forEach(n.list, function(e) {
                        var t = c(e.project_id);
                        t && (e.project.observations_count = t.observations_count, e.project.taxa_count = t.taxa_count), this.push(e.project)
                    }, t), n.list = t
                }
            };
            n.projOrder = function(e) {
                return -1 * r.indexOf(parseInt(e.id))
            }, n.join = function(a) {
                e.addUserToProject(a.id).then(function() {
                    t.success("הצטרפת לפרויקט בהצלחה"), n.$emit("refreshProjects")
                })
            }, n.leave = function(a) {
                var i = s.open({
                    templateUrl: "leaveProjectModal.html",
                    controller: ["$scope", "$uibModalInstance", "project", function(e, t, n) {
                        e.project = n, e.ok = function() {
                            t.close()
                        }, e.cancel = function() {
                            t.dismiss()
                        }
                    }],
                    size: "sm",
                    resolve: {
                        project: a
                    }
                });
                i.result.then(function() {
                    e.removeUserFromProject(a.id).then(function() {
                        t.primary("עזבת את הפרויקט"), n.$emit("refreshProjects")
                    })
                })
            }, n.$watch("projects", d, !0)
        };
        return {
            restrict: "E",
            scope: {
                projects: "="
            },
            link: o,
            templateUrl: i + "partials/list.html"
        }
    }
    e.$inject = ["$stateProvider"], t.$inject = ["$scope", "restApi", "$rootScope", "Globals", "AuthService", "userInfo", "$timeout", "slug"], n.$inject = ["$scope", "userInfo", "Globals", "AuthService", "$state"], a.$inject = ["AuthService", "Notification", "$window", "Globals", "$uibModal"], angular.module("golan").config(e).controller("ProjectsCtrl", t).controller("ProjectsIndexController", n).directive("projectList", a);
    var i = "app/pages/projects/"
}(),
function() {
    "use strict";

    function e(e) {
        e.state("obs.single", {
            url: "view/:id",
            templateUrl: t + "single/single.html",
            controller: "ObCtrl"
        }).state("obs.add", {
            url: "add",
            templateUrl: t + "add/addob.html",
            controller: "AddObController",
            controllerAs: "add",
            resolve: {
                item: ["userInfo", "AuthService", "$q", function(e, t, n) {
                    if (!e) {
                        t.onLoadStatus().then(function() {
                            a.resolve(null)
                        }, function() {
                            a.reject({
                                type: 1,
                                redirect: "obs.add",
                                notify: "יש לתהחבר למערכת על מנת ליצור תצפית חדשה"
                            })
                        });
                        var a = n.defer();
                        return a.promise
                    }
                    return null
                }]
            }
        }).state("obs.edit", {
            url: "edit/:id",
            templateUrl: t + "add/addob.html",
            controller: "AddObController",
            controllerAs: "add",
            resolve: {
                item: ["$stateParams", "restApi", "$q", "userInfo", function(e, t, n, a) {
                    console.log();
                    var i = n.defer();
                    if (e.id) {
                        t.obs.single({
                            id: e.id
                        }).then(function(e) {
                            a.id === e.items.user_id ? i.resolve(e.items) : i.reject({
                                notify: "הפריט לא שייך למשתמש",
                                type: 99
                            })
                        })
                    } else i.reject({
                        notify: "שגיאה בעריכת הפריט",
                        type: 99
                    });
                    return i.promise
                }]
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("golan").config(e);
    var t = "app/pages/obs/"
}(),
function() {
    "use strict";

    function e(e) {
        e.state("news.list", {
            url: "",
            templateUrl: "app/pages/news/news.html",
            controller: "NewsController"
        }).state("news.single", {
            url: "/view/:id",
            templateUrl: "app/pages/news/single.html",
            controller: "NewsSingleController"
        })
    }

    function t(e, t) {
        e.items = null, e.currentPage = 1, e.perPage = 10, e.totalItems = 0, e.years = [], e.activeYear = null, e.pageChanged = function() {
            n()
        }, e.filterYear = function(t) {
            t === e.activeYear ? e.activeYear = null : e.activeYear = t, n()
        };
        var n = function() {
                t.cake.news({
                    limit: e.perPage,
                    page: e.currentPage,
                    year: e.activeYear
                }).then(function(t) {
                    e.items = t.items, e.totalItems = t.total
                }, function() {})
            },
            a = function() {
                t.cake.newsCount().then(function(t) {
                    e.years = t
                })
            };
        n(), a()
    }

    function n(e, t, n) {
        var a = n.id,
            i = function() {
                t.cake.singleNews(a).then(function(t) {
                    e.item = t
                })
            };
        e.item = {}, i()
    }
    e.$inject = ["$stateProvider"], t.$inject = ["$scope", "restApi"], n.$inject = ["$scope", "restApi", "$stateParams"], angular.module("golan").config(e).controller("NewsController", t).controller("NewsSingleController", n)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i, s) {
        e.params = n, t.getUserInfo().then(function() {
            a.go("home"), s.success("אתה מחובר למערכת")
        }), e.userInfo = {
            user: null,
            password: null
        }, e.authError = !1, e.loading = !1, e.login = function() {
            e.authError = !1, e.loading = !0, t.login(e.userInfo).then(function(t) {
                e.loading = !1, e.params.redirect ? angular.isFunction(e.params.redirect) ? e.params.redirect(t) : a.go(e.params.redirect) : a.go("home")
            }, function() {
                e.authError = !0, e.loading = !1
            })
        }
    }
    e.$inject = ["$scope", "AuthService", "$stateParams", "$state", "userInfo", "Notification"], angular.module("golan").controller("loginController", e)
}(),
function() {
    "use strict";

    function e(e, t, n) {
        e.webRoot = n.get().webroot, e.items = null, e.cats = null, e.activeCat = null;
        var a = function() {
            t.cake.articles().then(function(t) {
                e.items = t.items, e.cats = t.cats
            }, function() {})
        };
        e.setActiveCat = function(t) {
            e.activeCat && e.cats[t].categories.id === e.activeCat.categories.id ? e.activeCat = null : e.activeCat = e.cats[t]
        }, a()
    }
    e.$inject = ["$scope", "restApi", "Globals"], angular.module("golan").controller("ArticlesController", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i) {
        i.$broadcast("ccActiveState", "home");
        var s = null,
            o = null,
            r = null,
            l = null;
        e.mapOptions = {
            center: {
                lat: 33.00603,
                lng: 35.48344
            },
            zoom: 10,
            options: {
                scrollwheel: !0,
                draggable: !0,
                disableDefaultUI: !1
            }
        }, e.loadingItems = !0, e.totalItems = 0, e.currentPage = 1, e.perPage = 50, e.mapHeight = {
            height: n.innerHeight - t.offset().top
        }, e.items = [], e.activeItem = null;
        var c = function() {
            e.items = [], e.loadingItems = !0;
            var t = {
                page: e.currentPage,
                perPage: e.perPage,
                taxonId: s,
                project: angular.isObject(r) ? r.slug : null,
                q: o,
                advSearch: l
            };
            a.obs.golanArea.get(t).then(function(t) {
                $(".scroller").animate({
                    scrollTop: 0
                }, "80"), e.activeItem = null, e.loadingItems = !1, e.items = t.items, e.totalItems = t.total
            })
        };
        e.showItem = function(t, n) {
            e.items[t].latitude && n && (e.mapOptions.center = {
                lat: e.items[t].latitude,
                lng: e.items[t].longitude
            }), e.activeItem = t
        }, e.pageChanged = function(t) {
            e.currentPage = t, c()
        }, e.$on("headerFilter", function(e, t) {
            s = t.taxonId, o = t.query, r = t.project, l = t.advSearch, c(), $(".scroller").animate({
                scrollTop: 0
            }, "1000")
        }), e.$on("activeChange", function(t, n) {
            e.showItem(n), $(".scroller").animate({
                scrollTop: 87 * n
            }, "2000")
        }), c()
    }
    e.$inject = ["$scope", "$element", "$window", "restApi", "$rootScope"], angular.module("golan").controller("HomeCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t) {
        e.msg = {}, e.loading = !1, e.formDisabled = !1, e.formSuccess = !1, e.text = "", t.cake.texts("contact").then(function(t) {
            e.text = t
        }), e.send = function(n) {
            e.loading = !0, angular.forEach(n.$error.required, function(e) {
                e.$setDirty()
            }), n.$valid ? (e.formDisabled = !0, t.cake.sendContact(e.msg).then(function(t) {
                e.loading = !1, t ? e.formSuccess = !0 : e.formDisabled = !1
            }, function() {
                alert("שגיאה בשליחה הודעה")
            })) : e.loading = !1
        }
    }
    e.$inject = ["$scope", "restApi"], angular.module("golan").controller("ContactController", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a) {
        var i = n.get();
        e.text = "", t.cake.texts("activity").then(function(t) {
            e.text = t
        });
        var s = i.dates,
            o = {
                week: {
                    d1: s.week,
                    d2: s.today
                },
                month: {
                    d1: s.month,
                    d2: s.today
                },
                year: {
                    d1: s.year,
                    d2: s.today
                },
                ever: {}
            },
            r = 0;
        e.projOrder = function(e) {
            return -1 * i.defaultProjects.indexOf(parseInt(e.id))
        }, e.projects = i.projects, e.activeProject = e.projects[r], angular.forEach(e.projects, function(t) {
            -1 !== i.defaultProjects.indexOf(parseInt(t.id)) && (e.activeProject = t)
        }), e.items = null, e.observers = null, e.identifiers = null, e.filterBy = "month", e.filter = function(t) {
            e.filterBy = t, l(o[t]), c(o[t])
        }, e.changeProject = function(t) {
            e.activeProject = t, l(o[e.filterBy]), c(o[e.filterBy])
        }, e.taxaLink = function(e) {
            a.go("home", {
                filter: {
                    q: e.taxon.preferred_common_name
                }
            })
        };
        var l = function(n) {
                e.activeProject.slug && (n.project_id = e.activeProject.slug), t.stats.mostViewed(n).then(function(t) {
                    e.items = t.results
                })
            },
            c = function(n) {
                e.activeProject.slug && (n.project_id = e.activeProject.slug), t.stats.topObservers(n).then(function(t) {
                    e.observers = t.results
                }), t.stats.topIdentifiers(n).then(function(t) {
                    e.identifiers = t.results
                })
            };
        l(o.month), c(o.month)
    }
    e.$inject = ["$scope", "restApi", "Globals", "$state"], angular.module("golan").controller("ActivityController", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a) {
        e.items = null, e.aboutBox = {
            headline: "אודות תצפיטבע",
            "class": "about",
            "short": ""
        }, e.newsCols = [
            [],
            [],
            [e.aboutBox]
        ], t.cake.texts("about").then(function(t) {
            e.aboutBox["short"] = n.trustAsHtml(t)
        }), t.cake.texts("about_bottom").then(function(t) {
            e.joinText = t
        });
        var i = 0,
            s = function(t) {
                angular.forEach(t, function(t, n) {
                    e.newsCols[n % 2].push(t)
                })
            },
            o = function() {
                t.cake.homeItems().then(function(t) {
                    e.items = t.pics, s(t.news)
                })
            };
        o(), e.imgLoad = function() {
            i++, i === e.items.length && a(function() {
                $(".cc-slick").slick({
                    slideToScroll: 1,
                    slidesToShow: 3,
                    arrows: !0,
                    variableWidth: !0,
                    rtl: !1,
                    infinite: !0,
                    centerMode: !1,
                    autoplay: !0,
                    autoplaySpeed: 2e3
                }), e.slideReady = !0
            }, 1e3)
        }
    }
    e.$inject = ["$scope", "restApi", "$sce", "$timeout"], angular.module("golan").controller("AboutCtrl", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i, s, o, r, l) {
        e.userMenuOpen = !1, e.activeAnimal = null, e.searchQuery = null, e.selectedProject = null;
        var c, d, u = function() {
                e.advOpen = !1, d = {
                    taxonId: angular.isObject(e.activeAnimal) ? e.activeAnimal.id : null,
                    query: e.searchQuery,
                    project: e.selectedProject,
                    advSearch: e.advSearch
                }, t.$broadcast("headerFilter", d), e.advSearch && s.ga && ga("send", "event", "Advanced Search", "Search"), e.showFilters || a.go("home", {
                    filters: d
                }).then(function() {
                    t.$broadcast("headerFilter", d)
                })
            },
            p = function() {
                e.searchQuery = null, e.activeAnimal = null
            };
        p(), e.changeFilter = u, e.filterAnimals = [{
            name: "mammals",
            id: 40151,
            "class": "gicon-uni41",
            title: "יונקים"
        }, {
            name: "birds",
            id: 3,
            "class": "gicon-uni43",
            title: "עופות"
        }, {
            name: "rep",
            id: 26036,
            "class": "gicon-y",
            title: "זוחלים"
        }, {
            name: "arachnida",
            id: 47119,
            "class": "gicon-m",
            title: "עכבישים"
        }, {
            name: "insects",
            id: 47158,
            "class": "gicon-uni114",
            title: "חרקים"
        }, {
            name: "plants",
            id: 47126,
            "class": "gicon-G2",
            title: "צמחים"
        }], e.showFilters = !1, e.$on("ccActiveState", function(t, n) {
            e.showFilters = "home" === n
        }), t.$on("$stateChangeStart", function(t, n, a) {
            return e.showFilters = "home" === n.name, e.advOpen = !1, "home" === n.name ? (a.filter && a.filter.q && (e.searchQuery = a.filter.q, l(u, 500)), !1) : void p()
        }), e.filterAnimal = function(t) {
            angular.isObject(e.activeAnimal) && t.id === e.activeAnimal.id ? t = null : e.taxaSearchTypeHead = t.title, e.activeAnimal = t, u()
        }, e.$on("activeProject", function() {
            e.selectedProject = t.activeProject
        }), e.clearSearch = function() {
            e.searchQuery = null, u()
        };
        var m = function() {
            e.projOrder = function(e) {
                return -1 * c.defaultProjects.indexOf(parseInt(e.id))
            }, e.projects = c.projects
        };
        e.$on("globals", function() {
            c = n.get(), m()
        }), c = n.get(), angular.isDefined(c.projects) && m();
        var g = new Date;
        if (e.advOpen = !1, e.advSearch = {
                active: !1,
                dateRange: !1,
                showEnd: !1,
                showStart: !1,
                startDate: new Date(g.getTime() - 7776e6),
                endDate: g,
                user: null
            }, e.toggleDates = function(t) {
                var n = !e.advSearch[t];
                e.advSearch.showEnd = !1, e.advSearch.showStart = !1, e.advSearch[t] = n
            }, e.setTaxaTypeHead = function(t) {
                e.taxaSearchTypeHead = t.matched_term, e.activeAnimal = {
                    id: t.id
                }
            }, e.getTaxa = function(e) {
                return i.taxa.autocomplete(e).then(function(e) {
                    return e.results
                })
            }, e.closeAdv = function() {
                e.advOpen = !1
            }, e.clearAdv = function() {
                e.advSearch.active = !1, e.advSearch.user = null, e.activeAnimal = null, e.taxaSearchTypeHead = null, e.searchQuery = null, e.selectedProject = null, e.golbalObject.clear(), u()
            }, e.golbalObject = {}, s.ga) {
            var v, f = !0;
            e.$watch("advOpen", function(e) {
                v = e ? "open" : "close", f ? f = !1 : ga("send", "event", "Advanced Search", v)
            })
        }
        e.userInfo = {}, e.userLoginData = {}, e.loggedIn = !1, e.loading = !1, e.login = function() {
            angular.forEach(e.loginForm.$error.required, function(e) {
                e.$setDirty()
            }), e.loginForm.$valid ? (e.formDisabled = !0, e.loading = !0, o.login(e.userLoginData).then(function() {
                e.userLoginData.isopen = !1, e.loading = !1, r.success("התחברת בהצלחה")
            }, function() {
                e.loading = !1, e.loginForm.$setPristine(), e.userLoginData = {
                    isopen: !0,
                    error: "כניסה נכשלה"
                }
            })) : e.loading = !1
        }, e.logout = function() {
            o.logout()
        }, e.$on("loginChanged", function(t, n) {
            e.loggedIn = n, n && o.getUserInfo().then(function(t) {
                e.userInfo = t
            })
        })
    }
    e.$inject = ["$scope", "$rootScope", "Globals", "$state", "restApi", "$window", "AuthService", "Notification", "$timeout"], angular.module("golan").controller("headerCtrl", e)
}(),
function() {
    "use strict";
    var e = "app/components/directives/partials/";
    angular.module("golan").directive("itemGrade", ["$timeout", "$compile", function(t, n) {
        function a(e, t, a) {
            e.grades = i, e.btnGroupType = "btn-group-vertical", e.showPopover = !1, a.horizonal ? (e.btnGroupType = "btn-group", e.showPopover = !0) : t.is("label") && (t.html("{{grades[activeGrade].title}}"), n(t.contents())(e)), e.$watch("data", function() {
                e.data.ccInfo && (e.activeGrade = e.data.ccInfo.grade)
            })
        }
        var i = [{
            title: "מאושר",
            "class": "fa-check-circle",
            name: "curator"
        }, {
            title: 'זוהה ע"י קהילה',
            "class": "fa-comment",
            name: "community"
        }, {
            title: 'זוהה ע"י משתמש',
            "class": "fa-user",
            name: "user"
        }, {
            title: "מחכה לזיהוי",
            "class": "fa-question-circle",
            name: "needid"
        }];
        return {
            scope: {
                data: "="
            },
            templateUrl: e + "item-grade.html",
            link: a
        }
    }]).directive("itemsGallery", ["ccUtils", function(t) {
        return {
            scope: {
                items: "="
            },
            controller: ["$scope", function(e) {
                e.getImage = function(e) {
                    return t.getItemImage(e, "medium")
                }
            }],
            link: function(e) {
                e.$watch("items", function() {})
            },
            templateUrl: e + "items-gallery.html"
        }
    }]).directive("itemsList", ["$state", function(t) {
        return {
            scope: {
                items: "=",
                toggle: "&",
                activeItem: "="
            },
            controller: ["$scope", function(e) {
                e.clickLocation = function(n, a, i) {
                    i ? t.go("obs.single", {
                        id: n.id
                    }) : e.toggle({
                        item: n,
                        index: a
                    })
                }
            }],
            link: function(e, t, n) {},
            templateUrl: e + "items-list.html"
        }
    }]).directive("itemMedia", ["ccUtils", "$compile", function(e, t) {
        return {
            restrict: "C",
            scope: {
                item: "="
            },
            link: function(n, a, i) {
                var s, o = i.size ? i.size : "square",
                    r = e.getItemImage(n.item, o);
                r ? s = "<img src='" + r + "' class='op-image' imageonload='removeOp'>" : (a.addClass("no-image-parent"), s = '<div class="no-image">תצפית<br>ללא<br>תמונה</div>');
                var l = t(s),
                    c = l(n);
                a.append(c)
            }
        }
    }]).directive("ccEnter", function() {
        return function(e, t, n) {
            t.bind("keydown, keypress", function(t) {
                13 === t.which && (e.$apply(function() {
                    e.$eval(n.ccEnter)
                }), t.preventDefault())
            })
        }
    }).directive("actualSrc", function() {
        return {
            link: function(e, t, n) {
                n.$observe("actualSrc", function(e, a) {
                    if (void 0 != e) {
                        var i = new Image;
                        i.src = n.actualSrc, angular.element(i).bind("load", function() {
                            t.attr("src", n.actualSrc)
                        })
                    }
                })
            }
        }
    }).directive("ccWikiLink", ["ccUtils", function(e) {
        var t = "https://he.wikipedia.org/wiki/",
            n = function(e) {
                return t + e.split(" ").join("_")
            };
        return {
            scope: {
                item: "=ccWikiLink"
            },
            link: function(e, t) {
                e.$watch("item", function() {
                    return e.item.taxon ? void t.attr("href", n(e.item.taxon.name)) : void(e.item.ccInfo && t.attr("href", n(e.item.ccInfo.name)))
                })
            }
        }
    }]).directive("imageonload", function() {
        return {
            restrict: "A",
            link: function(e, t, n) {
                t.bind("load", function() {
                    "removeOp" === n.imageonload ? t.removeClass("op-image") : e.$apply(n.imageonload)
                })
            }
        }
    }).directive("compareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(e, t, n, a) {
                a.$validators.compareTo = function(t) {
                    return t == e.otherModelValue
                }, e.$watch("otherModelValue", function() {
                    a.$validate()
                })
            }
        }
    }).directive("speciesCompleate", ["restApi", function(t) {
        var n = function(e) {
            var n = this,
                a = !1;
            n.text = "", n.showClear = !1, n.clear = function() {
                n.text = null, n.taxa = null, n.model = null, e.innerModel = null, e.noTaxasResults = !1
            }, n.setTaxaTypeHead = function(t) {
                e.innerModel = t.matched_term, n.text = t.matched_term, n.model = t.id, n.taxa = t
            }, n.getTaxa = function(e) {
                return t.taxa.autocomplete(e).then(function(e) {
                    return e.results
                })
            }, e.model ? (a = !0, n.setTaxaTypeHead({
                matched_term: e.text ? e.text : e.model,
                id: e.model
            })) : e.model = "", e.$watch("innerModel", function(e) {
                n.text = e, null !== e && e && 0 !== e.length ? n.showClear = !0 : (n.model = null, n.taxa = null, n.showClear = !1)
            }), e.$watch("noTaxasResults", function(e) {
                return a ? void(a = !1) : void(e || (n.model = null, n.taxa = null))
            })
        };
        return n.$inject = ["$scope"], {
            scope: {
                model: "=",
                text: "="
            },
            bindToController: {
                model: "=?",
                taxa: "=?",
                text: "=?",
                onfocus: "&",
                placeholder: "@"
            },
            controller: n,
            controllerAs: "auto",
            templateUrl: e + "species-compleate.html"
        }
    }]).directive("usersCompleate", ["restApi", function(t) {
        var n = function(e) {
            var n = this;
            e.model = "", n.text = "", n.showClear = !1, n.clear = function() {
                n.text = null, n.taxa = null, n.model = null, e.innerModel = null, e.noTaxasResults = !1
            }, n.set = function(t) {
                var a = t.User.name ? t.User.name : t.User.login;
                e.innerModel = a, n.text = a, n.model = t.User.id, n.taxa = t
            }, n.searchUsers = function(e) {
                return t.cake.members(e).then(function(e) {
                    return e
                })
            }, e.$watch("innerModel", function(e) {
                n.text = e, null !== e && e && 0 !== e.length ? n.showClear = !0 : (n.model = null, n.taxa = null, n.showClear = !1)
            }), e.$watch("noTaxasResults", function(e) {
                e || (n.model = null, n.taxa = null)
            }), e.internalControl = e.control || {}, e.internalControl.clear = function() {
                e.innerModel = null
            }
        };
        return n.$inject = ["$scope"], {
            scope: {
                control: "="
            },
            bindToController: {
                model: "=?",
                taxa: "=?",
                text: "=?",
                onfocus: "&",
                placeholder: "@"
            },
            controller: n,
            controllerAs: "auto",
            templateUrl: e + "users-compleate.html"
        }
    }])
}(),
function() {
    "use strict";

    function e(e, t) {
        var n = e.get(),
            a = {
                square: "square_url",
                medium: "medium_url",
                large: "large_url"
            },
            i = {
                text: null,
                event: function(e) {
                    e.returnValue = i.text
                }
            },
            s = {
                getItemImage: function(e, t) {
                    return t = t || "square", angular.isDefined(e.photos[0]) ? e.photos[0][a[t]] : e.identifications && angular.isDefined(e.identifications[0]) && "square" === t ? e.identifications[0].taxon.image_url : null
                },
                getItemTitle: function(e) {
                    return e.taxon ? e.taxon.common_name ? e.taxon.common_name.name : e.taxon.name : e.species_guess
                },
                isUserCurator: function(t) {
                    return n.curators || (n = e.get()), -1 !== n.curators.indexOf(t)
                },
                preventWindowLeave: function(e, n) {
                    function a() {
                        t.addEventListener ? t.addEventListener("beforeunload", i.event) : t.attachEvent("onbeforeunload", i.event)
                    }

                    function s() {
                        t.removeEventListener ? t.removeEventListener("beforeunload", i.event) : t.detachEvent("onbeforeunload", i.event)
                    }
                    e ? (i.text = n, a()) : s()
                }
            };
        return s
    }

    function t(e, t, n) {
        return {
            notify: function(a) {
                var i, s = 0,
                    o = a.length,
                    r = n.$new(!0);
                r.current = s, r.total = o, r["class"] = "primary", i = e.primary({
                    delay: null,
                    templateUrl: "app/components/directives/partials/loader-notify.html",
                    scope: r
                }), angular.forEach(a, function(e) {
                    e.then(function() {
                        s++, o >= s && (r.current = s)
                    }, function(e) {
                        s++, r["class"] = "error", r.error = !0
                    })
                }), t.allSettled(a).then(function() {
                    i.$$state.value.kill(), r.error ? e.error("חלק מהתמונות נכשלו, נסו שוב.") : e.success("כל התמונות עלו בהצלחה")
                })
            }
        }
    }
    e.$inject = ["Globals", "$window"], t.$inject = ["Notification", "$q", "$rootScope"], angular.module("golan").factory("ccUtils", e).service("ccSmartNotify", t)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i, s, o, r) {
        var l = i.get(),
            c = t.apiUrl,
            d = "http://api.inaturalist.org/v1/",
            u = "inat/",
            p = {
                swlat: 32.660819,
                swlng: 35.551178,
                nelat: 33.460714,
                nelng: 35.917847
            },
            m = {
                fixObs: function(e) {
                    var t = function(e) {
                            return e.taxon ? e.taxon.common_name ? e.taxon.common_name.name : e.taxon.name : e.species_guess ? e.species_guess : e.identifications && e.identifications.length ? e.identifications[0].taxon.name : "לא ידוע"
                        },
                        n = function(e) {
                            var t = {
                                id: e.user_id
                            };
                            return angular.isObject(e.user) ? e.user.name ? t.name = e.user.name : t.name = e.user.login : t.name = e.login, t
                        },
                        a = function(e) {
                            var t = null;
                            return e.identifications && e.identifications.length && (angular.forEach(e.identifications, function(e) {
                                s.isUserCurator(e.user.login) && (t = e)
                            }), t) ? t.taxon_id !== e.taxon_id ? t.taxon : 0 : !e.taxon_id || e.id_please ? 3 : e.community_taxon_id ? 1 : 2
                        },
                        i = [];
                    return angular.forEach(e, function(e) {
                        e.ccInfo = {}, e.ccInfo.grade = a(e), angular.isObject(e.ccInfo.grade) && (e.taxon = e.ccInfo.grade, e.ccInfo.grade = 0), e.ccInfo.name = t(e), e.ccInfo.user = n(e), this.push(e)
                    }, i), i
                }
            },
            g = [];
        o.$on("globals", function() {
            l = i.get()
        });
        var v = {
            obs: {
                golanArea: {
                    get: function(i) {
                        var s = n.defer(),
                            o = {
                                q: i.q || null,
                                projects: i.project,
                                swlat: 32.660819,
                                swlng: 35.551178,
                                nelat: 33.460714,
                                nelng: 35.917847,
                                page: i.page,
                                per_page: i.perPage || 30,
                                extra: "fields,identifications,projects",
                                taxon_id: i.taxonId,
                                locale: "iw"
                            };
                        if (i.advSearch && i.advSearch.active) {
                            var r = {
                                d1: a("date")(i.advSearch.startDate, "yyyy-MM-dd"),
                                d2: a("date")(i.advSearch.endDate, "yyyy-MM-dd"),
                                user: i.advSearch.user ? i.advSearch.user : null
                            };
                            angular.extend(o, r)
                        }
                        return t.test ? (e.get("../jsons/home.json").then(function(e) {
                            s.resolve({
                                items: m.fixObs(e.data),
                                total: 30
                            })
                        }), s.promise) : (e({
                            method: "GET",
                            url: u + "observations.json",
                            cache: !0,
                            params: o
                        }).success(function(e, t, n) {
                            s.resolve({
                                items: m.fixObs(e),
                                total: n()["x-total-entries"]
                            })
                        }).error(function(e, t) {
                            s.reject("Error", e, t)
                        }), s.promise)
                    }
                },
                project: {
                    get: function(t) {
                        var a = n.defer();
                        return e({
                            method: "GET",
                            url: u + "observations.json",
                            params: {
                                q: t.q || "",
                                projects: t.project,
                                page: t.page,
                                per_page: t.perPage || 30,
                                extra: "fields,identifications,projects",
                                locale: "iw"
                            }
                        }).success(function(e, t, n) {
                            a.resolve({
                                items: m.fixObs(e),
                                total: n()["x-total-entries"]
                            })
                        }).error(function(e, t) {
                            a.reject("Error", e, t)
                        }), a.promise
                    }
                },
                single: function(t) {
                    var a = n.defer();
                    return t.id && t.id.length ? e({
                        method: "GET",
                        url: u + "observations/" + t.id + ".json",
                        cache: !1,
                        params: {
                            extra: "fields,identifications",
                            locale: "iw"
                        }
                    }).success(function(e, t, n) {
                        a.resolve({
                            items: m.fixObs([e])[0]
                        })
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }) : a.reject("No Item Id"), a.promise
                },
                item: {
                    get: function(t) {
                        var a = n.defer();
                        return t.id && t.id.length ? e({
                            method: "GET",
                            url: u + "observations/" + t.id + ".json",
                            cache: angular.isDefined(t.cache) ? t.cache : !0,
                            params: {
                                page: t.page || 1,
                                per_page: t.perPage || 30,
                                extra: "fields,identifications",
                                locale: "iw"
                            }
                        }).success(function(e, t, n) {
                            a.resolve({
                                items: m.fixObs(e),
                                total: n()["x-total-entries"]
                            })
                        }).error(function(e, t) {
                            a.reject("Error", e, t)
                        }) : a.reject("No Item Id"), a.promise
                    }
                },
                similar: function(t) {
                    var a = n.defer(),
                        i = [],
                        s = 4,
                        o = p,
                        r = function() {
                            var e = [],
                                n = [];
                            n = i.filter(function(n) {
                                return n.id === t.id || e.indexOf(n.id) > -1 || e.length >= s ? !1 : (e.push(n.id), !0)
                            }), a.resolve({
                                items: n
                            })
                        };
                    if (t.item && angular.isNumber(t.item.taxon_id)) {
                        t = t.item, o.per_page = s + 1, o.taxon_id = t.taxon_id;
                        var l = {
                            method: "GET",
                            url: u + "observations.json",
                            params: o
                        };
                        e(l).success(function(n) {
                            i = n, i.length > s + 1 ? r() : t.taxon_id && t.taxon.parent_id ? (l.params.taxon_id = t.taxon.parent_id, e(l).success(function(e) {
                                i = i.concat(e), r()
                            }).error(function(e, t) {
                                a.reject("Error", e, t)
                            })) : r()
                        }).error(function(e, t) {
                            a.reject("Error", e, t)
                        })
                    } else a.reject("No Item set, Or no tax");
                    return a.promise
                }
            },
            projects: {
                get: function(t) {
                    var a = n.defer();
                    return e({
                        method: "GET",
                        url: c + "projects/" + t.project + ".json"
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                getSlugById: function(t) {
                    var a = n.defer();
                    return e({
                        method: "GET",
                        url: d + "projects/" + t
                    }).success(function(e) {
                        a.resolve(e.results[0].slug)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                members: function(t) {
                    var a = n.defer();
                    if (!t.projectId) return a.reject("No Project Id"), a.promise;
                    var i = {
                        per_page: t.per_page ? t.per_page : 4,
                        page: t.page ? t.page : 1
                    };
                    return e.get(d + "projects/" + t.projectId + "/members", {
                        params: i,
                        cache: t.cache ? t.cache : !1
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                }
            },
            users: {
                getSingle: function(t) {
                    var a = n.defer();
                    return e({
                        method: "GET",
                        url: c + "users/" + t.userSlug + ".json",
                        cache: !1,
                        params: {},
                        ignoreLoadingBar: t.loadingBar ? t.loadingBar : !0
                    }).success(function(e) {
                        e.login && (e.ccInfo = {
                            curator: s.isUserCurator(e.login)
                        }), a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                getUserProjects: function(t) {
                    var a = n.defer();
                    return e({
                        method: "GET",
                        url: c + "projects/user/" + t.userSlug + ".json",
                        tokenRequired: !0
                    }).success(function(e) {
                        a.resolve(e)
                    }), a.promise
                }
            },
            stats: {
                mostViewed: function(t) {
                    var a = n.defer(),
                        i = {
                            projects: "tatzpiteva",
                            locale: "iw",
                            per_page: 5
                        },
                        s = angular.extend(i, t);
                    return e({
                        method: "GET",
                        url: d + "observations/species_counts",
                        params: s,
                        cache: !0
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                topObservers: function(t) {
                    var a = n.defer(),
                        i = {
                            project_id: "tatzpiteva",
                            per_page: 5
                        },
                        s = angular.extend(i, t);
                    return e({
                        method: "GET",
                        cache: !0,
                        url: d + "observations/observers",
                        params: s
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                topIdentifiers: function(t) {
                    var a = n.defer(),
                        i = {
                            project_id: "tatzpiteva",
                            per_page: 5
                        },
                        s = angular.extend(i, t);
                    return e({
                        method: "GET",
                        cache: !0,
                        url: d + "observations/identifiers",
                        params: s
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                }
            },
            taxa: {
                autocomplete: function(t) {
                    var a = n.defer();
                    return e({
                        method: "GET",
                        url: d + "taxa/autocomplete",
                        params: {
                            per_page: 30,
                            locale: "iw",
                            q: t
                        },
                        cache: !0,
                        ignoreLoadingBar: !0
                    }).success(function(e) {
                        a.resolve(e)
                    }).error(function(e, t) {
                        a.reject("Error", e, t)
                    }), a.promise
                },
                get: function(t) {
                    e.get(d + "taxa/" + t).then(function(e) {}, function() {})
                }
            },
            cake: {
                homeItems: function() {
                    var t = n.defer();
                    return e.get(l.backUrl + "/app/about").then(function(e) {
                        t.resolve(e.data)
                    }), t.promise
                },
                links: function() {
                    var t = n.defer();
                    return e.get(l.backUrl + "/links").then(function(e) {
                        t.resolve(e.data)
                    }), t.promise
                },
                sendContact: function(t) {
                    var a = n.defer();
                    return e({
                        method: "POST",
                        url: l.backUrl + "/app/send_contact",
                        data: $.param(t),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        ignoreLoadingBar: !0
                    }).then(function(e) {
                        a.resolve(e.data)
                    }, function(e) {
                        a.reject(e.data)
                    }), a.promise
                },
                news: function(t) {
                    var a = n.defer(),
                        i = t.page ? t.page : 1,
                        s = t.limit ? t.limit : 10,
                        o = t.year ? t.year : 0;
                    return e({
                        method: "GET",
                        url: l.backUrl + "/news/index/true/" + s + "/" + i + "/" + o,
                        cache: !0
                    }).success(function(e) {
                        a.resolve({
                            items: e.items,
                            total: e.total
                        })
                    }), a.promise
                },
                newsCount: function() {
                    var t = n.defer();
                    return e.get(l.backUrl + "/news/count").then(function(e) {
                        t.resolve(e.data)
                    }, function(e) {
                        t.reject(e)
                    }), t.promise
                },
                singleNews: function(t) {
                    var a = n.defer();
                    return e.get(l.backUrl + "/news/get/" + t).then(function(e) {
                        a.resolve(e.data)
                    }, function(e) {
                        a.reject(e)
                    }), a.promise
                },
                articles: function(t) {
                    var a = n.defer(),
                        i = !0;
                    return e({
                        method: "GET",
                        url: l.backUrl + "/articles/index/true/" + i,
                        cache: !0
                    }).success(function(e) {
                        a.resolve({
                            items: e.articles,
                            cats: e.cats
                        })
                    }), a.promise
                },
                texts: function(t) {
                    var a = n.defer();
                    return g.length ? a.resolve(g[t]) : e({
                        method: "GET",
                        url: l.backUrl + "/texts",
                        cache: !0
                    }).success(function(e) {
                        g = e, a.resolve(g[t])
                    }), a.promise
                },
                deleteIdentification: function(t) {
                    var a = n.defer();
                    return e.post(l.backUrl + "/obs/del_identification/" + t).success(function(e) {
                        a.resolve(e)
                    }).error(function() {
                        a.reject(data)
                    }), a.promise
                },
                deleteOb: function(t) {
                    var a = n.defer();
                    return e.post(l.backUrl + "/obs/delete/" + t).success(function(e) {
                        a.resolve(e)
                    }).error(function() {
                        a.reject()
                    }), a.promise
                },
                members: function(t) {
                    var a = n.defer();
                    return e.get(l.backUrl + "/users/search/" + t).success(function(e) {
                        a.resolve(e)
                    }).error(function() {
                        a.reject()
                    }), a.promise
                }
            },
            inat: {
                addOb: function(t, a) {
                    var i = n.defer(),
                        s = this;
                    return e({
                        method: "POST",
                        tokenRequired: !0,
                        data: {
                            observation: t
                        },
                        url: "inat/observations.json"
                    }).then(function(e) {
                        var n = e.data[0];
                        s.obsToProject(n.id, t.projects).then(function() {
                            i.resolve(n)
                        }), a.length && s.obImages(n.id, a)
                    }, function(e) {
                        i.reject(e)
                    }), i.promise
                },
                editOb: function(t, a) {
                    var i = n.defer(),
                        s = this;
                    return e({
                        method: "POST",
                        tokenRequired: !0,
                        data: {
                            _method: "put",
                            ignore_photos: 1,
                            observation: t
                        },
                        url: "inat/observations/" + t.id + ".json"
                    }).then(function(e) {
                        var n = e.data[0];
                        i.resolve(n), t.projectsToAdd.length && s.obsToProject(n.id, t.projectsToAdd).then(function() {}), t.projectsToRemove.length && s.obsRemoveProject(n.id, t.projectsToRemove).then(function() {}), i.resolve(n), a.length && s.obImages(n.id, a)
                    }, function(e) {
                        i.reject(e)
                    }), i.promise
                },
                obsToProject: function(t, a) {
                    var i = n.defer(),
                        s = [];
                    return angular.forEach(a, function(a) {
                        var i = n.defer();
                        e({
                            method: "POST",
                            url: "inat/project_observations.json",
                            tokenRequired: !0,
                            data: {
                                project_observation: {
                                    observation_id: t,
                                    project_id: a
                                }
                            },
                            ignoreLoadingBar: !0
                        }).then(function(e) {
                            i.resolve(e)
                        }, function(e) {
                            console.log(e), i.reject(e)
                        }), this.push(i.promise)
                    }, s), n.all(s).then(function(e) {
                        i.resolve()
                    }), i.promise
                },
                obsRemoveProject: function(t, a) {
                    var i = n.defer(),
                        s = [];
                    return angular.forEach(a, function(a) {
                        var i = n.defer();
                        console.log("Removing: ", a), e({
                            method: "DELETE",
                            url: "inat/projects/" + a + "/remove?observation_id=" + t,
                            tokenRequired: !0,
                            ignoreLoadingBar: !0
                        }).then(function(e) {
                            i.resolve(e)
                        }, function(e) {
                            console.log(e), i.reject(e)
                        }), this.push(i.promise)
                    }, s), n.all(s).then(function(e) {
                        i.resolve()
                    }), i.promise
                },
                obImages: function(t, a) {
                    var i = n.defer(),
                        l = [];
                    return s.preventWindowLeave(!0, "תמונות שקשורות לתצפיות לא סיימו לעלות לאתר. נא להשאיר את העמוד פתוח עד סיום ההעלאה"), angular.forEach(a, function(a) {
                        var i = n.defer(),
                            s = new FormData;
                        s.append("file", a.file), s.append("observation_photo[observation_id]", t), e({
                            method: "POST",
                            url: "inat/observation_photos.json",
                            tokenRequired: !0,
                            ignoreLoadingBar: !0,
                            transformRequest: angular.identity,
                            headers: {
                                "Content-Type": void 0
                            },
                            data: s
                        }).then(function(e) {
                            i.resolve()
                        }, function(e) {
                            console.log(e), i.reject()
                        }), this.push(i.promise)
                    }, l), r.notify(l), n.all(l).then(function() {
                        s.preventWindowLeave(!1), o.$broadcast("CCImagesLoaded"), i.resolve()
                    }), i.promise
                },
                identification: function(t) {
                    var a = n.defer(),
                        i = {
                            observation_id: t.parent,
                            taxon_id: t.specie,
                            body: t.body ? t.body : null
                        };
                    return e({
                        method: "POST",
                        tokenRequired: !0,
                        data: {
                            identification: i
                        },
                        ignoreLoadingBar: !0,
                        url: "inat/identifications.json"
                    }).then(function(e) {
                        a.resolve(e)
                    }, function(e) {
                        a.reject(e)
                    }), a.promise
                },
                comment: function(t) {
                    var a = n.defer(),
                        i = {
                            "comment[parent_type]": "Observation",
                            "comment[parent_id]": t.parent,
                            "comment[body]": t.body
                        };
                    return e({
                        method: "POST",
                        tokenRequired: !0,
                        data: i,
                        ignoreLoadingBar: !0,
                        url: "inat/comments.json"
                    }).success(function(e) {
                        e.errors ? a.reject(e.errors) : a.resolve(e)
                    }).error(function() {
                        a.reject(data)
                    }), a.promise
                }
            }
        };
        return v
    }
    e.$inject = ["$http", "config", "$q", "$filter", "Globals", "ccUtils", "$rootScope", "ccSmartNotify"], angular.module("golan").factory("restApi", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i, s) {
        var o = {},
            r = {},
            l = !1,
            c = {
                tokenRequired: !0
            },
            d = e.get(),
            u = i.apiUrl;
        a.$on("globals", function() {
            d = e.get()
        });
        var p = function(e) {
                var a = t.defer();
                return n({
                    method: "POST",
                    url: d.backUrl + "/users/login",
                    data: $.param(e),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    ignoreLoadingBar: !0
                }).then(function(e) {
                    e.data.success ? a.resolve(e.data.access_token) : a.reject(e)
                }, function(e) {
                    a.reject(e)
                }), a.promise
            },
            m = function() {
                var i = t.defer();
                return d.aToken = null, e.set(d), r = {}, l = !1, a.$broadcast("loginChanged", l), s.success("התנתקת מהמערכת בהצלחה"), n.get(d.backUrl + "/users/logout").then(function() {
                    i.resolve("Ok")
                }), i.promise
            },
            g = function(e) {
                l = !0, v(e).then(function(e) {
                    a.$broadcast("loginChanged", l, e)
                })
            },
            v = function(e) {
                var a = t.defer(),
                    i = function(e) {
                        return e.name ? e.firstName = e.name.split(" ")[0] : e.firstName = e.login, e
                    };
                return e ? (r = i(e), a.resolve(r)) : angular.equals({}, r) ? n.get(u + "users/edit.json", c).then(function(e) {
                    r = i(e.data), a.resolve(r)
                }, function(e) {
                    console.log("CACACA", e), a.reject(e)
                }) : a.resolve(r), a.promise
            },
            f = function(e) {
                var a = t.defer();
                return r.login && l ? (angular.isDefined(r.ccProjects) && !e ? a.resolve(r.ccProjects) : n.get(u + "projects/user/" + r.login + ".json", c).then(function(e) {
                    r.ccProjects = e.data, a.resolve(r.ccProjects)
                }, function(e) {
                    a.reject(e)
                }), a.promise) : (a.reject("No Login"), a.promise)
            };
        return o.login = function(n) {
            var a = t.defer();
            return p(n).then(function(t) {
                d.aToken = t, e.set(d), v().then(function(e) {
                    g(e), a.resolve(e)
                }, function() {
                    a.reject("Some thing went wrong")
                })
            }, function() {
                a.reject()
            }), a.promise
        }, o.getUserInfo = function() {
            var e = t.defer();
            return l ? (v().then(function(t) {
                e.resolve(t)
            }, function(t) {
                e.reject(t)
            }), e.promise) : (e.reject("Not Logged In"), e.promise)
        }, o.logout = function() {
            m()
        }, o.userInProject = function(e) {
            var n = t.defer();
            return f().then(function(t) {
                var a = !1;
                angular.forEach(t, function(t) {
                    t.project.slug === e && (a = !0)
                }), n.resolve(a)
            }, function(e) {
                console.log("Faild", e)
            }), n.promise
        }, o.userAllProjects = function() {
            var e = t.defer();
            return f(!0).then(function(t) {
                e.resolve(t)
            }, function(t) {
                e.reject(t)
            }), e.promise
        }, o.addUserToProject = function(e) {
            var a = t.defer();
            return n.get(d.backUrl + "/users/join_project/" + e, c).then(function() {
                f(!0), a.resolve()
            }, function() {}), a.promise
        }, o.removeUserFromProject = function(e) {
            var a = t.defer();
            return n.get(d.backUrl + "/users/leave_project/" + e, c).then(function() {
                f(!0), a.resolve()
            }, function() {}), a.promise
        }, o.editUser = function(e, a) {
            var i = t.defer(),
                s = new FormData;
            return angular.forEach(a, function(e, t) {
                s.append(t, e)
            }), n.post(d.backUrl + "/users/edit/" + e, s, {
                transformRequest: angular.identity,
                headers: {
                    "Content-Type": void 0
                },
                tokenRequired: !0,
                ignoreLoadingBar: !0
            }).then(function(e) {
                e.data.id ? (r = {}, v().then(function() {
                    i.resolve()
                })) : i.reject()
            }, function() {
                i.reject()
            }), i.promise
        }, o.onLoadStatus = function() {
            var e = t.defer();
            return d.aToken ? v().then(function(t) {
                g(t), e.resolve(t)
            }, function() {
                e.reject("Login Failed")
            }) : e.reject("No Access Token"), e.promise
        }, o.registerUser = function(a) {
            var i = t.defer();
            return n({
                method: "POST",
                url: d.backUrl + "/users/register",
                data: $.param(a),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                ignoreLoadingBar: !0
            }).then(function(t) {
                if (t.data.success === !0) {
                    var n = t.data.login.access_token;
                    d.aToken = n, e.set(d), v().then(function(e) {
                        g(e), i.resolve(t.data)
                    }, function() {
                        i.reject()
                    })
                } else i.reject(t.data)
            }, function(e) {
                i.reject(e)
            }), i.promise
        }, o
    }
    e.$inject = ["Globals", "$q", "$http", "$rootScope", "config", "Notification"], angular.module("golan").factory("AuthService", e)
}(),
function() {
    "use strict";

    function e() {
        function e() {}
        e()
    }
    angular.module("golan").controller("MainController", e)
}(),
function() {
    "use strict";

    function e() {
        return function(e) {
            var t = e.replace(/(.+) (.+)/, "$1T$2Z");
            return t
        }
    }
    angular.module("golan").filter("badDateToISO", e)
}(),
function() {
    "use strict";

    function e(e, t, n, a, i) {
        var s, o, r, l, c, d = 47126,
            u = 47158,
            p = 47119,
            m = [{
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#444444"
                }]
            }, {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    color: "#f2f2f2"
                }]
            }, {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 45
                }]
            }, {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    color: "#46bcec"
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#444444"
                }]
            }, {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "off"
                }]
            }],
            g = {
                center: {
                    lat: 33.00603,
                    lng: 35.48344
                },
                zoom: 10,
                mapTypeControl: !0,
                streetViewControl: !1,
                styles: m
            },
            v = null,
            f = null,
            h = null,
            b = function(e) {
                t(function() {
                    a.$broadcast("activeChange", e)
                })
            },
            y = function() {
                var e, t, n, i, m, g = 0;
                c = [], angular.forEach(o, function(o) {
                    if (n = "blue", i = {}, o.latitude) {
                        m = r, o.ccInfo && o.ccInfo.useLargeIcon && (m = l);
                        var c = null;
                        angular.isDefined(o.iconic_taxon) ? c = o.iconic_taxon.id : angular.isDefined(o.iconic_taxon_id) && (c = o.iconic_taxon_id), c === d ? n = "green" : (c === u || c === p) && (n = "red"), i.icon = m[n].normal, o.coordinates_obscured && (i.icon = m[n].obscured), e = new s.LatLng(o.latitude, o.longitude), t = new s.Marker({
                            position: e,
                            icon: i.icon,
                            animation: null
                        });
                        var v = g;
                        t.addListener("click", function() {
                            b(v)
                        }), o.dragable && (t.setDraggable(!0), t.addListener("dragend", function(e) {
                            a.$broadcast("mapItemDraged", {
                                latitude: e.latLng.lat(),
                                longitude: e.latLng.lng()
                            })
                        })), this.push(t), g++
                    }
                }, c)
            },
            w = function(e, t) {
                (e || 0 === e) && (c[e].setAnimation(s.Animation.j), c[e].setIcon(r.yellow.active), f.removeMarker(c[e]), c[e].setMap(h), (t || 0 === t) && (c[t].setAnimation(null), c[t].setIcon(r.green.normal), c[t].setMap(null), f.addMarker(c[t])))
            },
            j = function() {
                f && f.clearMarkers(), y(), f = new MarkerClusterer(h, c, {
                    gridSize: 8,
                    styles: [{
                        url: "assets/images/cluster.png",
                        height: 53,
                        width: 53
                    }]
                })
            },
            x = function(e) {
                var t = angular.extend(g, e);
                t.options.zoomControlOptions = {
                    position: google.maps.ControlPosition.TOP_LEFT
                }, h = new s.Map(document.getElementById("map"), t), l = {
                    green: {
                        active: {
                            url: "assets/images/iconsprite-large.png",
                            size: new google.maps.Size(45, 54),
                            origin: new google.maps.Point(0, 0)
                        },
                        normal: {
                            url: "assets/images/iconsprite-large.png",
                            size: new google.maps.Size(30, 45),
                            origin: new google.maps.Point(40, 0)
                        },
                        obscured: {
                            url: "assets/images/iconsprite-large.png",
                            size: new google.maps.Size(25, 25),
                            origin: new google.maps.Point(72, 0)
                        }
                    },
                    blue: {
                        active: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(34, 44), new s.Point(0, 45)),
                        normal: {
                            url: "assets/images/iconsprite-large.png",
                            size: new google.maps.Size(30, 45),
                            origin: new google.maps.Point(40, 50)
                        },
                        obscured: {
                            url: "assets/images/iconsprite-large.png",
                            size: new google.maps.Size(25, 25),
                            origin: new google.maps.Point(72, 52)
                        }
                    },
                    grey: {
                        active: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(34, 42), new s.Point(0, 88)),
                        normal: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(23, 37), new s.Point(36, 88)),
                        obscured: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(21, 23), new s.Point(60, 88))
                    },
                    yellow: {
                        active: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(34, 42), new s.Point(0, 131)),
                        normal: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(23, 37), new s.Point(36, 131)),
                        obscured: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(21, 23), new s.Point(60, 131))
                    },
                    red: {
                        active: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(34, 42), new s.Point(0, 150)),
                        normal: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(27, 42), new s.Point(40, 203)),
                        obscured: new s.MarkerImage("assets/images/iconsprite-large.png", new s.Size(26, 25), new s.Point(69, 203))
                    }
                }, r = {
                    green: {
                        active: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(34, 44), new s.Point(0, 0)),
                        normal: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(23, 37), new s.Point(36, 0)),
                        obscured: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(21, 23), new s.Point(60, 0))
                    },
                    blue: {
                        active: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(34, 44), new s.Point(0, 45)),
                        normal: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(23, 37), new s.Point(36, 45)),
                        obscured: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(21, 23), new s.Point(60, 45))
                    },
                    grey: {
                        active: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(34, 42), new s.Point(0, 88)),
                        normal: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(23, 37), new s.Point(36, 88)),
                        obscured: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(21, 23), new s.Point(60, 88))
                    },
                    yellow: {
                        active: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(34, 42), new s.Point(0, 131)),
                        normal: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(23, 37), new s.Point(36, 131)),
                        obscured: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(21, 23), new s.Point(60, 131))
                    },
                    red: {
                        active: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(34, 42), new s.Point(0, 177)),
                        normal: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(23, 37), new s.Point(36, 177)),
                        obscured: new s.MarkerImage("assets/images/iconsprite.png", new s.Size(21, 23), new s.Point(60, 177))
                    }
                };
                var n = h.getZoom();
                h.addListener("zoom_changed", function() {
                    a.$broadcast("zoomChange", h.getZoom() - n), n = h.getZoom()
                }), h.addListener("center_changed", function() {
                    a.$broadcast("centerChange", h.getCenter())
                }), h.addListener("maptypeid_changed", function() {
                    "hybrid" === this.getMapTypeId() ? this.setOptions({
                        styles: []
                    }) : this.setOptions({
                        styles: m
                    })
                })
            },
            $ = function(e) {
                e && e.center && h.setCenter(new s.LatLng(Number(e.center.lat), Number(e.center.lng)))
            },
            k = function(t) {
                t.mapsReady = !1, e.then(function(e) {
                    s = e, i.getUserInfo().then(function(e) {
                        v = e.id, x(t.options)
                    }, function() {
                        x(t.options)
                    })
                }), t.$watch("items", function() {
                    if (t.items)
                        if (t.active && c[t.active] && c[t.active].setMap(null), o = angular.isArray(t.items) ? t.items : [t.items], s) j();
                        else var e = n(function() {
                            s && (j(), n.cancel(e))
                        }, 250, 10)
                }), t.$watch("options", function(e) {
                    s && $(e)
                }, !0), t.$watch("active", w), t.$on("smallCenterChange", function(e, t) {
                    h.setCenter(t)
                })
            };
        return {
            scope: {
                items: "=",
                options: "=",
                active: "="
            },
            template: '<div id="map"></div>',
            link: k
        }
    }

    function t(e, t) {
        var n, a, i, s, o = function(e, n) {
                n ? s = e.addListener("center_changed", function() {
                    t.$broadcast("smallCenterChange", e.getCenter())
                }) : google.maps.event.removeListener(s)
            },
            r = function() {
                a = new n.Map(document.getElementById("small-map"), {
                    center: {
                        lat: 33.00603,
                        lng: 35.48344
                    },
                    zoom: i,
                    disableDefaultUI: !0,
                    mapTypeIds: n.MapTypeId.TERRAIN,
                    styles: [{
                        featureType: "road",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "landscape",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "poi",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative.country",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "landscape.natural",
                        elementType: "geometry.fill",
                        stylers: [{
                            visibility: "on"
                        }]
                    }]
                }), o(a, !0)
            },
            l = function(t) {
                e.then(function(e) {
                    i = 7, n = e, r()
                }), t.$on("zoomChange", function(e, t) {
                    a && (i += t, i > 4 && (o(a, !1), a.setZoom(i), o(a, !0)))
                }), t.$on("centerChange", function(e, t) {
                    a && i > 4 && (o(a, !1), a.setCenter(t), o(a, !0))
                })
            };
        return {
            scope: {},
            template: '<div id="small-map"></div>',
            link: l
        }
    }
    e.$inject = ["uiGmapGoogleMapApi", "$timeout", "$interval", "$rootScope", "AuthService"], t.$inject = ["uiGmapGoogleMapApi", "$rootScope"], angular.module("golan").directive("ccMap", e).directive("ccMapSmall", t)
}(), angular.module("ngLocale", [], ["$provide", function(e) {
        function t(e) {
            e += "";
            var t = e.indexOf(".");
            return -1 == t ? 0 : e.length - t - 1
        }

        function n(e, n) {
            var a = n;
            void 0 === a && (a = Math.min(t(e), 3));
            var i = Math.pow(10, a),
                s = (e * i | 0) % i;
            return {
                v: a,
                f: s
            }
        }
        var a = {
            ZERO: "zero",
            ONE: "one",
            TWO: "two",
            FEW: "few",
            MANY: "many",
            OTHER: "other"
        };
        e.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: ["לפנה״צ", "אחה״צ"],
                DAY: ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"],
                ERANAMES: ["לפני הספירה", "לספירה"],
                ERAS: ["לפנה״ס", "לספירה"],
                FIRSTDAYOFWEEK: 6,
                MONTH: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
                SHORTDAY: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
                SHORTMONTH: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"],
                WEEKENDRANGE: [4, 5],
                fullDate: "EEEE, d בMMMM y",
                longDate: "d בMMMM y",
                medium: "d בMMM y H:mm:ss",
                mediumDate: "d בMMM y",
                mediumTime: "H:mm:ss",
                "short": "d.M.y H:mm",
                shortDate: "d.M.y",
                shortTime: "H:mm"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "₪",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-",
                    negSuf: " ¤",
                    posPre: "",
                    posSuf: " ¤"
                }]
            },
            id: "he",
            pluralCat: function(e, t) {
                var i = 0 | e,
                    s = n(e, t);
                return 1 == i && 0 == s.v ? a.ONE : 2 == i && 0 == s.v ? a.TWO : 0 == s.v && (0 > e || e > 10) && e % 10 == 0 ? a.MANY : a.OTHER
            }
        })
    }]),
    function() {
        "use strict";

        function e(e, t, n, a, i) {
            e.$on("$stateChangeSuccess", function(e, a, i, s) {
                return "stats" === s.name || "stats" === a.name && s.name.length ? void n.location.reload() : void(n.ga && n.ga("send", "pageview", {
                    page: t.path()
                }))
            }), e.$on("$stateChangeError", function(e, t, n, s, o, r) {
                angular.isDefined(r) ? 1 === r.type ? a.go("login", {
                    redirect: r.redirect ? r.redirect : null,
                    notify: r.notify ? r.notify : null
                }) : (r.notify && i.error(r.notify), a.go("home")) : a.go("home")
            });
            var s = function() {
                    var e, t = n.navigator,
                        a = t.userAgent,
                        i = a.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                    return /trident/i.test(i[1]) ? (e = /\brv[ :]+(\d+)/g.exec(a) || [], {
                        name: "IE",
                        version: e[1] || ""
                    }) : "Chrome" === i[1] && (e = a.match(/\bOPR\/(\d+)/), null != e) ? {
                        name: "Opera",
                        version: e[1]
                    } : (i = i[2] ? [i[1], i[2]] : [t.appName, t.appVersion, "-?"], null != (e = a.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]), {
                        name: i[0],
                        version: i[1]
                    })
                },
                o = s();
            angular.element("body").addClass(o.name + " " + o.name + "-" + o.version)
        }
        e.$inject = ["$rootScope", "$location", "$window", "$state", "Notification"], angular.module("golan").run(e)
    }(),
    function() {
        "use strict";

        function e(e, t, n) {
            var a = "app/pages/";
            e.state("root", {
                "abstract": !0,
                template: '<div ui-view=""></div>',
                resolve: {
                    globalData: ["$q", "$http", "Globals", function(e, t, n) {
                        var a = {},
                            i = e.defer();
                        return "object" == typeof app && app.golanBackEnd ? (angular.extend(a, app.golanBackEnd), n.set(a), i.resolve(a)) : t.get("http://localhost/golan/GolanBackEnd/json/app/init", {
                            cache: !0
                        }).success(function(e) {
                            angular.extend(a, e), n.set(a), i.resolve(a)
                        }), i.promise
                    }],
                    userInfo: ["$q", "AuthService", "globalData", function(e, t, n) {
                        t.onLoadStatus().then(function(e) {
                            a.resolve(e)
                        }, function() {
                            a.resolve(!1)
                        });
                        var a = e.defer();
                        return a.promise
                    }]
                }
            }).state("home", {
                parent: "root",
                url: "/",
                params: {
                    filter: null
                },
                templateUrl: a + "home/home.html",
                controller: "HomeCtrl",
                onEnter: function() {
                    angular.element("body").addClass("no-scroll")
                },
                onExit: function() {
                    angular.element("body").removeClass("no-scroll")
                }
            }).state("about", {
                parent: "root",
                url: "/about",
                templateUrl: a + "about/about.html",
                controller: "AboutCtrl"
            }).state("obs", {
                parent: "root",
                url: "/obs/",
                "abstract": !0,
                template: '<div ui-view=""></div>'
            }).state("user", {
                parent: "root",
                url: "/users/view/:slug",
                controller: "UsersController",
                "abstract": !0,
                templateUrl: a + "users/user.html"
            }).state("projects", {
                parent: "root",
                url: "/projects",
                "abstract": !0,
                template: '<div ui-view=""></div>'
            }).state("activity", {
                parent: "root",
                url: "/activity",
                templateUrl: a + "activity/activity.html",
                controller: "ActivityController"
            }).state("join", {
                parent: "root",
                url: "/join",
                templateUrl: a + "join/join.html",
                controller: ["$scope", "restApi", function(e, t) {
                    t.cake.texts("join").then(function(t) {
                        e.joinText = t
                    })
                }]
            }).state("contact", {
                parent: "root",
                url: "/contact",
                templateUrl: a + "contact/contact.html",
                controller: "ContactController"
            }).state("news", {
                parent: "root",
                url: "/news",
                "abstract": !0,
                template: '<div ui-view=""></div>'
            }).state("info", {
                parent: "root",
                url: "/info",
                templateUrl: a + "info/articles.html",
                controller: "ArticlesController"
            }).state("login", {
                parent: "root",
                url: "/login/",
                templateUrl: a + "login/login.html",
                controller: "loginController",
                params: {
                    redirect: null,
                    notify: null
                }
            }).state("register", {
                parent: "root",
                url: "/register",
                templateUrl: a + "register/register.html"
            }), t.when(/stats/i, function() {
                return !0
            }), t.otherwise("/"), n.html5Mode(!0)
        }
        e.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"], angular.module("golan").config(e)
    }(),
    function() {
        "use strict";
        angular.module("golan").constant("config", {
            test: !1,
            env: "dev",
            appName: "Golan",
            appVersion: .1,
            apiUrl: "http://www.inaturalist.org/"
        })
    }(),
    function() {
        "use strict";

        function e(e, t, n, a) {
            e.debugEnabled(!0), t.configure({
                key: "AIzaSyDNkjs2j9ZhdyE8OBta5OhjL8-k4Em-_KI",
                v: "3.22",
                language: "he"
            }), n.interceptors.push("ccHttpRequestInterceptor"), a.setOptions({
                delay: 5e3,
                startTop: 185,
                startRight: 0,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: "left",
                positionY: "top"
            })
        }

        function t(e) {
            var t = {
                data: {},
                set: function(t) {
                    this.data = t, e.$broadcast("globals")
                },
                get: function() {
                    return this.data
                }
            };
            return t
        }

        function n(e, t) {
            return {
                request: function(n) {
                    if (!n.tokenRequired) return n;
                    var a = t.get().aToken;
                    if (!a) {
                        var i = e.defer();
                        n.timeout = i.promise, i.resolve({
                            statusText: "No Auth Set"
                        })
                    }
                    return n.headers.Authorization = "Bearer " + a, n
                }
            }
        }
        e.$inject = ["$logProvider", "uiGmapGoogleMapApiProvider", "$httpProvider", "NotificationProvider"], t.$inject = ["$rootScope"], n.$inject = ["$q", "Globals"], angular.module("golan").config(e).factory("Globals", t).factory("ccHttpRequestInterceptor", n), angular.module("httpPostFix", [], ["$httpProvider", function(e) {
            e.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8", e.defaults.transformRequest = [function(e) {
                var t = function(e) {
                    var n, a, i, s, o, r, l, c = "";
                    for (n in e)
                        if (a = e[n], a instanceof Array)
                            for (l = 0; l < a.length; ++l) o = a[l], i = n + "[" + l + "]", r = {}, r[i] = o, c += t(r) + "&";
                        else if (a instanceof Object)
                        for (s in a) o = a[s], i = n + "[" + s + "]", r = {}, r[i] = o, c += t(r) + "&";
                    else void 0 !== a && null !== a && (c += encodeURIComponent(n) + "=" + encodeURIComponent(a) + "&");
                    return c.length ? c.substr(0, c.length - 1) : c
                };
                return angular.isObject(e) && "[object File]" !== String(e) ? t(e) : e
            }]
        }])
    }(), angular.module("golan").run(["$templateCache", function(e) {
        e.put("app/main/main.html", '<div class="container"><div><acme-navbar creation-date="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'), e.put("app/components/header/adv-search.html", '<div class="uib-dropdown-menu main-drop"><div class="holder"><form class="form-horizontal"><div class="form-group"><label>טקסט חופשי</label> <input type="text" class="form-control" ng-model="searchQuery" cc-enter="changeFilter()"></div><div class="form-group users"><label>שם מתצפת</label><users-compleate model="advSearch.user" control="golbalObject"></users-compleate></div><div class="form-group"><label>פרוייקט</label><select ng-model="selectedProject" class="form-control" ng-options="project.title for project in projects | orderBy:projOrder"></select></div><div class="form-group relative species"><label>שם הזן <span ng-show="loadingTaxas"><i class="fa fa-spinner fa-spin"></i></span></label><div ng-show="noTaxasResults" class="pull-left">אין תוצאות</div><input type="text" ng-model="taxaSearchTypeHead" typeahead-editable="false" uib-typeahead="taxa for taxas in getTaxa($viewValue)" typeahead-loading="loadingTaxas" typeahead-no-results="noTaxasResults" typeahead-template-url="customTaxaTemplateHome.html" typeahead-min-length="2" typeahead-on-select="setTaxaTypeHead($item)" class="form-control"></div><div class="form-group dates"><label><input type="checkbox" ng-model="advSearch.dateRange"> טווח תאריכים</label><div class="dates-dropdown" ng-show="advSearch.dateRange"><div class="dropdown"><span>תצפיות מ</span> <button uib-datepicker-popup="" class="btn btn-primary btn-xs" ng-class="{active: advSearch.showStart}" ng-click="toggleDates(\'showStart\')" is-open="advSearch.showStart" ng-model="advSearch.startDate" show-weeks="false" current-text="היום" close-text="סגור" clear-text="נקה">{{advSearch.startDate | date : \'mediumDate\'}} <span ng-show="!advSearch.startDate">ריק</span></button> <span>עד</span> <button uib-datepicker-popup="" class="btn btn-primary btn-xs" ng-class="{active: advSearch.showEnd}" ng-click="toggleDates(\'showEnd\')" is-open="advSearch.showEnd" ng-model="advSearch.endDate" show-weeks="false" current-text="היום" close-text="סגור" clear-text="נקה">{{advSearch.endDate | date : \'mediumDate\'}} <span ng-show="!advSearch.endDate">ריק</span></button></div></div></div><div class="row actions"><hr><button class="btn btn-default pull-right" ng-click="closeAdv()">סגור</button> <button type="button" class="btn btn-primary pull-left" ng-model="advSearch.active" ng-click="changeFilter()" uib-btn-checkbox="" btn-checkbox-true="true" btn-checkbox-false="false"><span>חפש</span></button> <button class="btn btn-default pull-left clean" ng-click="clearAdv()">נקה</button></div></form></div></div>'), e.put("app/components/header/header.html", '<header ng-controller="headerCtrl"><nav class="navbar navbar-static-top"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" ui-sref="home"><img ng-src="assets/images/sideLogo.png" alt=""></a></div><a href="http://www.golan.org.il/" target="_blank" class="navbar-brand regional pull-left"><img ng-src="assets/images/golanlogo.png" alt=""></a><div class="collapse navbar-collapse tac"><ul class="nav navbar-nav"><li ui-sref-active="active"><a ui-sref="home({search: null})" ui-sref-opts="{reload : true}">ראשי</a></li><li ui-sref-active="active"><a ui-sref="about">עידכונים</a></li><li role="presentation" uib-dropdown=""><a href="" uib-dropdown-toggle=""><span>פרויקטים</span> <span class="caret"></span></a><ul uib-dropdown-menu=""><li ng-repeat="project in projects | orderBy: projOrder" ng-if="project.slug && project.menu_flag === \'1\'"><a ui-sref="projects.single({slug: project.slug})">{{project.title}}</a></li><li role="separator" class="divider"></li><li><a ui-sref="projects.list">כל הפרויקטים</a></li></ul></li><li ui-sref-active="active"><a ui-sref="activity">פעילות</a></li><li ui-sref-active="active"><a ui-sref="info">מידע נוסף</a></li><li ui-sref-active="active"><a ui-sref="contact">צור קשר</a></li></ul></div></div></nav><div class="crumb"><div class="container-fluid"><div class="row"><div class="col-md-3 free-search" ng-class="{open : advOpen}"><div class="input-group input-group-sm"><input type="text" class="form-control" placeholder="חיפוש תצפיות..." ng-model="searchQuery" cc-enter="changeFilter()" ng-disabled="advOpen"> <i class="fa fa-times remove-search" ng-show="searchQuery.length" ng-click="clearSearch()"></i> <span class="input-group-btn search"><button class="btn btn-default" type="button" ng-click="changeFilter()">חפש</button></span> <span class="input-group-btn adv-search" uib-dropdown="" auto-close="disabled" is-open="advOpen"><button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle="" title="חיפוש מתקדם" ng-class="{\'btn-primary\' : advSearch.active}"><span class="fa fa-search-plus"></span></button><div ng-include="\'app/components/header/adv-search.html\'"></div></span></div></div><div class="col-md-2 projects" ng-show="showFilters"><div class="input-group input-group-sm"><select ng-change="changeFilter()" ng-model="selectedProject" class="form-control" ng-options="project.title for project in projects | orderBy:projOrder"><option value="">תצפיות מכל הפרויקטים</option></select></div></div><div class="col-md-4 filters" ng-if="showFilters"><i ng-repeat="animal in filterAnimals" title="{{animal.title}}" class="{{animal.class}} {{animal.name}}" ng-class="{active: animal.id === activeAnimal.id}" ng-click="filterAnimal(animal)"></i></div><div class="user-actions pull-left tal"><div class="col-md-1 "><button ui-sref="cams.index" class="btn btn-primary">מצלמות שטח</button></div><div class="btn-group join" role="group" uib-dropdown="" is-open="userLoginData.isopen" auto-close="outsideClick"><button ui-sref="join" class="btn btn-primary" ng-if="!loggedIn">הצטרפו עכשיו</button> <button ui-sref="obs.add" class="btn btn-success" ng-if="loggedIn">הוספת תצפית</button><button type="button" class="btn user" ng-class="{\'btn-primary\' : !loggedIn, \'btn-success\' : loggedIn}" uib-dropdown-toggle="" ng-attr-title="{{loggedIn ? \'החשבון שלך\' : \'כניסה למערכת\'}}"><span ng-hide="userInfo.user_icon_url && loggedIn" class="fa fa-user"></span> <span ng-if="loggedIn" class="user-icon"><img ng-src="{{userInfo.user_icon_url}}" alt=""></span></button><div uib-dropdown-menu="" class="dropdown-menu-left"><div class="holder"><form class="form-horizontal" novalidate="" name="loginForm" ng-show="!loggedIn"><div class="form-group form-group-sm" ng-class="{ \'has-error\': loginForm.user.$invalid && loginForm.user.$dirty }"><label class="control-label">שם משתמש</label> <input type="text" class="form-control" ng-model="userLoginData.user" name="user" required=""> <label class="help-block" ng-show="loginForm.user.$invalid && loginForm.user.$dirty">חובה להזין שם משתמש</label></div><div class="form-group form-group-sm" ng-class="{ \'has-error\': loginForm.password.$invalid && loginForm.password.$dirty }"><label class="control-label">סיסמא</label> <input type="password" class="form-control" ng-model="userLoginData.password" name="password" required=""> <label class="help-block" ng-show="loginForm.password.$invalid && loginForm.password.$dirty">חובה להזין סיסמא</label></div><div class="form-group form-group-sm has-error" ng-show="userLoginData.error && !loading"><label class="help-block">{{userLoginData.error}}</label></div><div class="submit row"><button class="btn btn-sm btn-primary pull-left" type="submit" ng-click="login()"><span>כניסה</span> <span ng-hide="!loading"><span class="fa fa-spinner fa-spin"></span></span></button></div></form><div ng-if="loggedIn"><li><span>היי,</span> {{userInfo.name}}</li><li role="separator" class="divider"></li><li class="counter"><small class="pull-right"><span>תצפיות :</span> <span class="badge">{{userInfo.observations_count}}</span></small> <small class="pull-left"><span>זיהויים:</span> <span class="badge">{{userInfo.identifications_count}}</span></small></li><li role="separator" class="divider"></li><li><a ui-sref="user.obs({slug : userInfo.login})">התצפיות שלי</a></li><li><a ui-sref="user.profile({slug : userInfo.login})">עריכת פרופיל</a></li><li><a ui-sref="user.projects({slug : userInfo.login})">פרויקטים</a></li><li><a ui-sref="user.password({slug : userInfo.login})">החלפת סיסמא</a></li><li role="separator" class="divider"></li><li><a class="pull-left btn btn-xs btn-primary" ng-click="logout()">התנתק</a></li></div></div></div></div></div></div></div></div></header><script type="text/ng-template" id="customTaxaTemplateHome.html"><div class="media pointer"> <div class="media-left"> <img class="media-object" ng-src="{{match.model.default_photo[\'square_url\']}}"> </div> <div class="media-body"> <h5 class="media-heading" ng-bind-html="match.model.matched_term | uibTypeaheadHighlight:query"></h5> <div class="latin"> <small>{{match.model.name}}</small> </div> </div> </div></script>'), e.put("app/pages/about/about.html", '<div class="about"><div class="gallery container-fluid"><div class="holder row relative"><div class="cc-slick" ng-class="{ready : slideReady}"><div class="slide" ng-repeat="item in items"><div class="inner relative"><img ng-src="{{item.url}}" imageonload="imgLoad()"><div class="info pointer" ui-sref="obs.single({id: item.id})">{{item.name}}</div></div></div></div><div class="slider-loader" ng-show="!slideReady"><i class="fa fa-spinner fa-spin"></i></div></div></div><div class="updates container"><div class="page-header"><h1>הודעות ועדכונים</h1></div><div class="row"><div class="col-md-4" ng-repeat="col in newsCols track by $index"><div class="panel panel-primary" ng-repeat="item in col track by $index" ng-class="[item.class]"><div class="panel-heading"><h3 class="panel-title">{{item.headline}}</h3></div><div class="panel-body"><div ng-bind-html="item.short"></div></div><div class="panel-footer" ng-if="item.updated_at"><small>פורסם בתאריך: <span>{{item.updated_at | badDateToISO | date : \'d/MM/yyyy\'}}</span></small> <a ui-sref="news.single({id: item.id})" class="pull-left">קרא עוד...</a></div></div></div><div class="col-md-12"><hr><a ui-sref="news.list" class="pull-left">לכל ההודעות באתר</a></div></div></div><div class="join-now container-fluid"><div class="container"><h1>תצפיטבע זקוק לעזרתכם</h1><div class="mt20 mb20" ng-bind-html="joinText"></div><p><a class="btn btn-primary btn-lg" ui-sref="join" role="button">הצטרפות</a></p></div></div></div>'), e.put("app/pages/activity/activity.html", '<div class="activity-page container content"><div class="page-header"><h1>פעילות</h1><div class="filters"><div class="btn-group" role="group" uib-dropdown=""><button type="button" class="btn btn-default" uib-dropdown-toggle="">{{activeProject.title}} <i class="fa fa-caret-down"></i></button><ul uib-dropdown-menu=""><li ng-repeat="project in projects | orderBy:projOrder"><a ng-click="changeProject(project)" class="pointer">{{project.title}}</a></li></ul></div><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-default" ng-class="{active: (filterBy === \'week\')}" ng-click="filter(\'week\')">השבוע</button> <button type="button" class="btn btn-default" ng-class="{active: (filterBy === \'month\')}" ng-click="filter(\'month\')">החודש</button> <button type="button" class="btn btn-default" ng-class="{active: (filterBy === \'year\')}" ng-click="filter(\'year\')">השנה</button> <button type="button" class="btn btn-default" ng-class="{active: (filterBy === \'ever\')}" ng-click="filter(\'ever\')">כל הזמנים</button></div></div></div><div ng-bind-html="text"></div><div class="row"><div class="top-obs col-md-3"><h3>הזנים הנצפים ביותר</h3><div class="row" ng-if="items.length"><div class="col-md-12" ng-repeat="item in items | limitTo:5"><div class="thumbnail"><div class="image pointer" ng-click="taxaLink(item)"><img ng-if="item.taxon.default_photo" actual-src="{{item.taxon.default_photo.medium_url}}"><div ng-if="!item.taxon.default_photo" class="no-image"><span>זן<br>ללא<br>תמונה</span></div></div><div class="caption relative"><h4><span class="pointer" ng-click="taxaLink(item)">{{$index+1}}. {{item.taxon.preferred_common_name}}</span></h4><span class="label label-success"><span class="num">{{item.count}}</span></span><div class="info"><p class="latin">{{item.taxon.name}}</p></div></div></div></div></div><p ng-hide="items.length">לא נמצאו תוצאות</p></div><div class="top-users col-md-3 col-md-offset-1"><h3>המשתמשים הפעילים ביותר</h3><div class="row" ng-if="observers.length"><div class="col-md-12" ng-repeat="user in observers | limitTo:5" ui-sref="user.obs({slug: user.user.login})"><div class="thumbnail"><div class="image"><img actual-src="{{user.user.icon_url}}" ng-src="assets/images/person.png" ui-sref="user.obs({slug: user.user.login})" class="pointer"></div><div class="caption relative"><h4 ui-sref="user.obs({slug: user.user.login})" class="pointer">{{$index+1}}. {{user.user.name}} <span ng-hide="user.user.name">{{user.user.login}}</span></h4><span class="label label-success"><span class="num">{{user.observation_count}}</span></span></div></div></div></div><p ng-hide="observers.length">לא נמצאו תוצאות</p></div><div class="top-users ident col-md-3 col-md-offset-1"><h3>המשתמשים המזהים ביותר</h3><div class="row" ng-if="identifiers.length"><div class="col-md-12 pointer" ng-repeat="user in identifiers | limitTo:5" ui-sref="user.obs({slug: user.user.login})"><div class="thumbnail"><div class="image"><img actual-src="{{user.user.icon_url}}" ng-src="assets/images/person.png" ui-sref="user.obs({slug: user.user.login})" class="pointer"></div><div class="caption relative"><h4 ui-sref="user.obs({slug: user.user.login})" class="pointer">{{$index+1}}. {{user.user.name}} <span ng-hide="user.user.name">{{user.user.login}}</span></h4><span class="label label-success"><span class="num">{{user.count}}</span></span></div></div></div></div><p ng-hide="identifiers.length">לא נמצאו תוצאות</p></div></div></div>'), e.put("app/pages/contact/contact.html", '<div class="contact"><div class="col-md-8 col-md-push-2"><div class="page-header"><h1>יצירת קשר</h1></div><div class="content"><div ng-bind-html="text"></div><form class="form-horizontal mt40" name="contact" novalidate=""><div class="form-group form-group-lg" ng-class="{ \'has-error\': contact.name.$invalid && contact.name.$dirty }"><label class="col-sm-2 control-label" for="name">שם מלא</label><div class="col-sm-10"><input class="form-control" ng-disabled="formDisabled" ng-model="msg.name" name="name" type="text" id="name" required=""> <label class="error">חובה להזין שם מלא</label></div></div><div class="form-group form-group-lg" ng-class="{ \'has-error\': contact.email.$invalid && contact.email.$dirty }"><label class="col-sm-2 control-label" for="email">דוא"ל</label><div class="col-sm-10"><input class="form-control" ng-disabled="formDisabled" ng-model="msg.email" name="email" type="email" id="email" required=""> <label class="error">חובה להזין כתובת דוא"ל תקינה</label></div></div><div class="form-group form-group-lg" ng-class="{ \'has-error\': contact.content.$invalid && contact.content.$dirty }"><label class="col-sm-2 control-label" for="content">תוכן הודעה</label><div class="col-sm-10"><textarea ng-disabled="formDisabled" class="form-control" ng-model="msg.content" name="content" id="content" rows="10" required=""></textarea> <label class="error">חובה להזין תוכן לפניה</label></div></div><div class="form-group form-group-lg"><div class="col-sm-10 col-sm-push-2"><label class="text-brand-success pull-right" ng-show="formSuccess">הודעתך נשלחה בהצלחה! תודה.</label> <button type="submit" ng-disabled="formDisabled" class="btn btn-primary btn-lg pull-left" ng-click="send(contact)"><span>שליחה</span> <span ng-show="loading"><i class="fa fa-spinner fa-spin"></i></span></button></div></div></form></div></div></div>'), e.put("app/pages/home/home.html", '<div id="home-map" class="container-fluid"><div class="row"><div class="col-md-3 items"><div class="holder"><div ng-include="\'app/pages/home/sidebar.html\'"></div></div></div><div class="col-md-9 map"><div class="holder" ng-style="mapHeight" style="height: 762px;"><cc-map items="items" options="mapOptions" active="activeItem" has-border=""></cc-map><cc-map-small></cc-map-small></div></div></div></div>'), e.put("app/pages/home/sidebar.html", '<div ng-style="mapHeight"><header class="hide"><div class="btn-group btn-group-justified" role="group" aria-label="Justified button group"><div class="btn-group" role="group"><button type="button" class="btn btn-default">חיפוש מתקדם<i class="fa fa-chevron-down"></i></button></div></div></header><perfect-scrollbar class="scroller" wheel-propagation="true" wheel-speed="5" min-scrollbar-length="20"><items-list items="items" toggle="showItem(index, true)" active-item="activeItem"></items-list><div ng-show="!items.length && !loadingItems" class="col-md-12 no-results"><h3>לא נמצאו תוצאות</h3><p>שנו את מרכיבי החיפוש</p></div></perfect-scrollbar><footer><uib-pagination total-items="totalItems" items-per-page="perPage" ng-model="currentPage" max-size="5" ng-change="pageChanged(currentPage)" class="pagination-sm" boundary-links="false" next-text="הבא" previous-text="הקודם"></uib-pagination></footer></div>'), e.put("app/pages/info/articles.html", '<div class="container articles"><div class="main"><div class="page-header"><h1>מידע נוסף</h1></div><div class="row"><div class="col-md-8"><div class="row"><div class="col-md-3 cats"><div class="list-group"><button type="button" class="list-group-item btn-secondary" disabled="">קטגוריות</button> <button type="button" class="list-group-item" ng-repeat="cat in cats" ng-class="{active : activeCat.categories.id === cat.categories.id}" ng-click="setActiveCat($index)">{{cat.categories.name}}</button></div></div><div class="col-md-9 articles"><div><h4></h4></div><ul class="media-list"><li class="media article" ng-repeat="article in items | filter: {\'cat_id\': activeCat.categories.id}"><div class="media-body"><h4 class="media-heading">{{article.subject}} <small class="text-muted inline"></small></h4><p>{{article.content}}</p><div class="info"><div ng-if="article.author"><label>מחבר</label> <span>{{article.author}}</span></div><div ng-if="article.published"><label>תאריך</label> <span>{{article.published | badDateToISO | date : \'d/MM/yyyy\'}}</span></div><div ng-if="article.published_at"><label>פורסם ב:</label> <span>{{article.published_at}}</span></div></div></div><div class="media-right media-middle"><a ng-if="article.file" ng-href="{{webRoot}}{{article.file}}" target="_blank" title="קריאת המאמר"><span class="fa fa-download fa-3x"></span></a></div></li></ul></div></div></div><div class="col-md-4"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">קישורים חשובים</h3></div><div class="panel-body"><links-list></links-list></div></div></div></div></div></div>'), e.put("app/pages/join/join.html", '<div class="join-page container content"><div class="page-header"><h1>הצטרפות <button class="btn btn-primary pull-left mt5" ui-sref="register">הרשמה לתצפיטבע</button></h1></div><div ng-bind-html="joinText"></div><div class="row apps"><div class="col-md-8 col-md-push-2"><div class="col-md-6"><a href="https://play.google.com/store/apps/details?id=org.tazpiteva.android" target="_blank"><img ng-src="assets/images/google-play.png"></a></div><div class="col-md-6"><a href="https://itunes.apple.com/il/app/tzpytb/id1059517651?mt=8" target="_blank"><img ng-src="assets/images/app-store.png"></a></div></div></div></div>'), e.put("app/pages/login/login.html", '<div class="login-page container content"><div class="row"><div class="col-sm-6 col-md-4 col-md-push-4"><div class="thumbnail mt40"><div class="alert alert-danger" role="alert" ng-show="params.notify">{{params.notify}}</div><div class="caption"><h3 class="tac">כניסה למערכת</h3><form class="form-horizontal"><div class="form-group"><label for="inputEmail3" class="col-sm-3 control-label">שם משתמש</label><div class="col-sm-9"><input type="text" class="form-control" id="inputEmail3" ng-model="userInfo.user"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-3 control-label">סיסמה</label><div class="col-sm-9"><input type="password" class="form-control" id="inputPassword3" ng-model="userInfo.password"></div></div><div class="form-group"><div class="col-sm-12"><button type="submit" class="btn btn-primary pull-left" ng-click="login()">כניסה</button></div></div></form></div></div></div></div></div>'), e.put("app/pages/news/news.html", '<div class="news-archive container"><div class="page-header"><h1>עדכונים אחרונים באתר תצפיטבע</h1></div><div class="content"><div class="col-md-2 filters"><div class="list-group"><button type="button" class="list-group-item btn-secondary tar" disabled="">ארכיון חדשות</button> <button type="button" class="list-group-item" ng-repeat="year in years" ng-click="filterYear(year.year)" ng-class="{active: year.year === activeYear}">{{year.year}} <span class="badge">{{year.cnt}}</span></button></div></div><div class="col-md-8"><div class="news" ng-repeat="news in items"><h3><a ui-sref="news.single({id: news.id})">{{news.headline}}</a></h3><div ng-bind-html="news.short"></div><div ng-bind-html="news.content"></div><small>פורסם בתאריך:</small> <small>{{news.updated_at | badDateToISO | date : \'d/MM/yyyy\'}}</small></div><uib-pagination ng-if="totalItems > perPage" ng-change="pageChanged()" total-items="totalItems" ng-model="currentPage" max-size="10" class="pagination-sm" items-per-page="perPage" boundary-links="false" next-text="הבא" previous-text="הקודם"></uib-pagination></div></div></div>'), e.put("app/pages/news/single.html", '<div class="news-single container-fluid"><div class="col-md-8 col-md-push-2"><div class="page-header"><h1><span>עידכון:</span> <span>{{item.headline}}</span> <a ui-sref="news.list" class="pull-left index">כל החדשות</a></h1></div><div class="content"><div class="news"><p ng-if="item.updated_at">פורסם בתאריך: {{item.updated_at | badDateToISO | date : \'d/MM/yyyy\'}}</p><div ng-bind-html="item.short"></div><div ng-bind-html="item.content"></div></div></div></div></div>'), e.put("app/pages/projects/index.html", '<div class="container content index-project"><div class="page-header" ng-show="showTitle"><h1>פרויקטים</h1></div><div class="content"><div ng-if="userProjects"><h3>הפרוייקטים שלי</h3><project-list projects="userProjects" update="update()"></project-list><hr></div><div><h3>פרויקטים זמינים</h3><project-list projects="projects" error-notice="אתה רשום לכל הפרויקטים הזמינים!"></project-list></div></div></div>'), e.put("app/pages/projects/single.html", '<div class="single-project container-fluid relative"><div class="row"><cc-map items="items" options="mapOptions"></cc-map></div><div class="container content"><div class="page-header"><h1><span>פרוייקט:</span> <span>{{project.title}}</span></h1><p><span>משתמשים:</span> {{projectMembers.total | number}} | <span>תצפיות:</span> {{project.project_observations_count | number}} | <span>זנים:</span> <span ng-if="projectCashedInfo">{{projectCashedInfo.taxa_count | number}}</span> <span ng-if="!projectCashedInfo">{{project.observed_taxa_count | number}}</span> <span ng-if="userLoggedIn && userInProject">| <span class="label label-success">רשום לפרוייקט</span></span></p></div><div class="row"><div class="col-md-8 main"><nav class="navbar navbar-default"><div class="navbar-header"><span class="navbar-brand">תצפיות</span></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav nav-tabs pull-right"><li role="presentation" ui-sref-active="active" class="active"><a ui-sref="projects.single.gallery">גלריה</a></li><li role="presentation" ui-sref-active="active" class="active"><a ui-sref="projects.single.list">רשימה</a></li></ul><form class="navbar-form navbar-left search-form" role="search"><div class="input-group"><input type="text" ng-model="q" cc-enter="search()" class="form-control" placeholder="חפש בפרוייקט זה..."> <span class="input-group-btn"><button ng-click="search()" class="btn btn-default" type="button">חפש</button></span></div><i class="fa fa-times remove-search" ng-show="q.length" ng-click="clearSearch()"></i></form></div></nav><div ui-view=""><items-gallery items="items" cc-pagination="pagOptions"></items-gallery></div><h4 ng-if="!items.length && !loadingItems">לא נמצאו פריטים</h4><div class="tac clear" ng-show="items.length"><uib-pagination total-items="pagOptions.totalItems" items-per-page="pagOptions.perPage" ng-model="pagOptions.currentPage" max-size="5" ng-change="pagOptions.pageChanged()" class="pagination-sm" boundary-links="false" next-text="הבא" previous-text="הקודם"></uib-pagination></div></div><div class="col-md-4 sidebar"><div class="panel panel-primary about"><div class="panel-heading">אודות הפרוייקט</div><div class="panel-body"><p>{{project.description}}</p><div class="btn-group btn-group-justified mt30" role="group" aria-label="Justified button group"><bottun ui-sref="join" class="btn btn-success" role="button" ng-show="!userLoggedIn">הצטרפות</bottun><bottun ng-click="joinProject()" class="btn btn-success" role="button" ng-show="userLoggedIn && !userInProject">הצטרף לפרוייקט זה</bottun></div></div></div><div class="panel panel-primary users"><div class="panel-heading">משתמשים בפרויקט</div><div class="panel-body"><a ng-repeat="member in projectMembers.items" ui-sref="user.obs({slug: member.user.login})"><img actual-src="{{member.user.icon_url}}" ng-src="assets/images/person.png" alt="{{member.user.name}}" title="{{member.user.name}}" width="66px" height="66px"></a></div></div></div></div></div></div>'), e.put("app/pages/register/register-form.html", '<div class="register-form"><div class="alert alert-success" role="alert" ng-if="userLoggedIn"><span>הינך כבר מחובר\\ת למערכת, אין צורך ברישום</span></div><div class="form" ng-if="!userLoggedIn"><form class="form-horizontal" name="regForm" novalidate=""><div class="form-group" ng-class="{\'has-error\' : regForm.email.$invalid && regForm.email.$dirty}"><label class="col-sm-2 control-label nowrap">דוא"ל</label><div class="col-sm-10"><input type="email" name="email" ng-model="user.email" class="form-control" required="" placeholder="כתובת הדואל העדכנית שלך"><div class="help-block" ng-show="regForm.email.$invalid && regForm.email.$dirty"><span>כתובת דוא"ל לא תקינה</span></div></div></div><div class="form-group" ng-class="{\'has-error\' : regForm.username.$invalid && regForm.username.$dirty}"><label class="col-sm-2 control-labe nowrap">שם משתמש</label><div class="col-sm-10"><input type="text" name="username" ng-model="user.login" class="form-control" ng-maxlength="40" ng-minlength="3" ng-pattern="/^[a-zA-Z0-9]*$/" required="" back-check-empty="" placeholder="יש להשתמש באותיות לועזיות קטנות ומספרים בלבד"><div class="help-block" ng-show="regForm.username.$pending"><i class="fa fa-spin fa-spinner"></i> <span>בודק זמינות שם משתמש</span></div><div class="help-block" ng-show="regForm.username.$invalid && regForm.username.$dirty"><div ng-show="regForm.username.$error.pattern">שם משתמש מכיל תווים לא חוקיים</div><div ng-show="regForm.username.$error.required">יש לבחור שם משתמש</div><div ng-show="regForm.username.$error.backCheckEmpty">שם זה כבר קיים במערכת</div><div ng-show="regForm.username.$error.minlength || regForm.username.$error.maxlength">שם משתמש חייב להיות בין 3 ל 40 תוים</div></div></div></div><div class="form-group"><label class="col-sm-2 control-label nowrap">שם מלא</label><div class="col-sm-10"><input type="text" name="userdisplay" ng-model="user.name" class="form-control" placeholder="השם שיוצג באתר, ניתן להשתמש בעברית"></div></div><div class="form-group" ng-class="{\'has-error\' : regForm.password.$invalid && regForm.password.$dirty}"><label class="col-sm-2 control-label">סיסמא</label><div class="col-sm-10"><input type="password" class="form-control" name="password" ng-model="user.password" required="" placeholder="אנגלית בלבד"><div class="help-block" ng-show="regForm.password.$invalid && regForm.password.$dirty"><span>חובה לבחור סיסמה</span></div></div></div><div class="form-group" ng-class="{\'has-error\' : regForm.passwordConfirm.$invalid && regForm.passwordConfirm.$dirty}"><label class="col-sm-2 control-label">אימות סיסמא</label><div class="col-sm-10"><input type="password" class="form-control" name="passwordConfirm" ng-model="user.password_confirmation" compare-to="user.password" required="" placeholder="אנגלית בלבד"><div class="help-block" ng-show="regForm.passwordConfirm.$invalid && regForm.passwordConfirm.$dirty && regForm.passwordConfirm.$error.compareTo"><span>סיסמאות לא תואמות</span></div><div class="help-block" ng-show="regForm.passwordConfirm.$invalid && regForm.passwordConfirm.$dirty && regForm.passwordConfirm.$error.required"><span>חובה להזין אימות סיסמה</span></div></div></div><div class="form-group"><label class="col-sm-2 control-label">מי אני</label><div class="col-sm-10"><textarea name="desc" ng-model="user.description" class="form-control" placeholder="כמה מילים על עצמך"></textarea></div></div><div class="form-group"><div class="col-sm-2"></div><div class="col-sm-7"><div class="alert alert-danger" role="alert" ng-show="errors"><div ng-repeat="error in errors">{{error}}</div></div></div><div class="col-sm-3"><button type="submit" class="btn btn-primary pull-left" ng-click="save(regForm)"><span>הרשמה</span> <span ng-show="loading"><span class="fa fa-spin fa-spinner"></span></span></button></div></div></form></div></div>'),
            e.put("app/pages/register/register.html", '<div class="col-md-8 col-md-push-2"><div class="page-header"><h1>יצירת חשבון משתמש</h1></div><div class="col-md-10 col-lg-8"><register-form></register-form></div></div>'), e.put("app/pages/users/user.html", '<div class="single-user container" ng-class="{\'logged-in\' : showUserMenu}"><div class="page-header"><div class="media"><div class="media-left"><img actual-src="{{user.medium_user_icon_url}}" ng-src="assets/images/person.png" alt=""></div><div class="media-body"><div class="info pull-right"><h1><span>משתמש:</span> <span>{{user.name.length ? user.name : user.login}}</span></h1><p class="join-date"><span>תאריך הצטרפות:</span> {{user.created_at | date : \'dd/MM/yyyy\'}}</p><ul class="nav nav-pills" ng-if="showUserMenu"><li role="presentation" ui-sref-active="active"><a ui-sref="user.obs()">תצפיות</a></li><li role="presentation" ui-sref-active="active"><a ui-sref="user.projects()">פרויקטים</a></li><li role="presentation" ui-sref-active="active"><a ui-sref="user.profile()">עריכת פרופיל</a></li><li role="presentation" ui-sref-active="active"><a ui-sref="user.password()">איפוס סיסמא</a></li></ul><p class="projects" ng-if="userProjects && !showUserMenu"><span>פרוייקטים:</span> <a class="label label-success" ng-repeat="p in userProjects" ui-sref="projects.single({slug: p.project_id})">{{p.project.title}}</a></p></div></div><div class="media-right"><div class="panels tac"><div class="panel panel-default"><div class="panel-heading">תצפיות</div><div class="panel-body">{{user.observations_count | number}}</div></div><div class="panel panel-default"><div class="panel-heading">זיהויים</div><div class="panel-body">{{user.identifications_count | number}}</div></div><div class="panel panel-default curator" ng-show="user.ccInfo.curator"><div class="panel-heading">תפקיד</div><div class="panel-body"><span>אוצר</span></div></div></div></div></div></div><div class="content"><div class="main"><div ui-view=""></div></div></div></div>'), e.put("app/components/directives/partials/item-grade.html", '<div ng-class="btnGroupType" role="group"><button type="button" ng-repeat="grade in grades" class="btn btn-transparent {{grade.name}}" ng-class="{active: $index === activeGrade}" title="{{$index === activeGrade && !showPopover ? grade.title : \'\'}}" popover-placement="bottom" uib-popover="{{grade.title}}" popover-append-to-body="true" popover-trigger="mouseenter" popover-class="{{grade.name}} popover-grade" popover-enable="showPopover"><i class="fa" ng-class="grade.class"></i></button></div>'), e.put("app/components/directives/partials/items-gallery.html", '<div class="gallery col-md-12"><div class="row"><div class="item" ng-repeat="animal in items" ui-sref="obs.single({id: animal.id})"><div class="item-media media-object" item="animal" size="medium"></div><div class="info"><a ui-sref="obs.single({id: animal.id})">{{ animal.ccInfo.name}}</a></div></div></div></div>'), e.put("app/components/directives/partials/items-list.html", '<ul class="media-list"><li ng-repeat="animal in items track by $index" class="media pointer {{animal.ccData.color}}" ng-class="{active : activeItem === $index}" ng-click="clickLocation(animal, $index, activeItem === $index)"><div class="media-left"><a ui-sref="obs.single({id: animal.id})"><div class="item-media media-object" item="animal" size="square"></div></a></div><div class="media-body"><h4 class="media-heading"><a ui-sref="obs.single({id: animal.id})">{{ animal.ccInfo.name}}</a></h4><div class="info"><div class="latin" ng-show="animal.taxon.name"><small><i class="fa fa-tag"></i> {{animal.taxon.name}}</small></div><a ui-sref="user.obs({slug: animal.user.login})"><i class="fa fa-user"></i> {{animal.ccInfo.user.name}}</a><div><small ng-if="animal.observed_on"><i class="fa fa-calendar"></i> {{animal.observed_on | date : \'d/MM/yyyy\' }}</small></div></div><div class="actions"><i ng-if="animal.coordinates_obscured" class="fa fa-circle text-brand-danger obscured" title="מיקום מוסתר"></i><item-grade data="animal"></item-grade></div></div></li></ul>'), e.put("app/components/directives/partials/loader-notify.html", '<div class="ui-notification" ng-class="class"><h3><span>מעלה תמונות</span> <span class="badge">{{current}} / {{total}}</span></h3><div class="message"><uib-progressbar class="progress-striped active" value="current" max="total" type="error ? \'danger\' : \'info\'"></uib-progressbar><div ng-if="error">שגיאה בהעלאת אחת התמונות</div></div></div>'), e.put("app/components/directives/partials/species-compleate.html", '<div class="relative species"><div class="row"><div class="col-md-10"><input type="text" ng-model="innerModel" uib-typeahead="taxa for taxas in auto.getTaxa($viewValue)" typeahead-loading="auto.loadingTaxas" typeahead-no-results="noTaxasResults" typeahead-template-url="customTaxaTemplate.html" typeahead-min-length="2" typeahead-on-select="auto.setTaxaTypeHead($item)" placeholder="{{auto.placeholder}}" ng-focus="auto.onfocus()" class="form-control"> <i class="fa fa-times pointer clear" ng-click="auto.clear()" ng-show="auto.showClear"></i></div><div class="col-md-2 nowrap info"><span ng-show="auto.loadingTaxas"><i class="fa fa-spinner fa-spin"></i></span><div ng-show="noTaxasResults">אין תוצאות</div></div></div><script type="text/ng-template" id="customTaxaTemplate.html"><div class="media pointer"> <div class="media-left"> <img class="media-object" ng-src="{{match.model.default_photo[\'square_url\']}}"> </div> <div class="media-body"> <h5 class="media-heading" ng-bind-html="match.model.matched_term | uibTypeaheadHighlight:query"></h5> <div class="latin"> <small>{{match.model.name}}</small> </div> </div> </div></script></div>'), e.put("app/components/directives/partials/users-compleate.html", '<div class="relative species"><div class="row"><div class="col-md-10 input-holder"><input type="text" ng-model="innerModel" uib-typeahead="user for users in auto.searchUsers($viewValue)" typeahead-loading="auto.loadingTaxas" typeahead-no-results="noTaxasResults" typeahead-template-url="userAutoComplete.html" typeahead-min-length="2" typeahead-on-select="auto.set($item)" placeholder="{{auto.placeholder}}" ng-focus="auto.onfocus()" class="form-control"> <i class="fa fa-times pointer clear" ng-click="auto.clear()" ng-show="auto.showClear"></i></div><div class="col-md-2 nowrap info"><span ng-show="auto.loadingTaxas"><i class="fa fa-spinner fa-spin"></i></span><div ng-show="noTaxasResults">אין תוצאות</div></div></div><script type="text/ng-template" id="userAutoComplete.html"><div class="media pointer"> <div class="media-left"> <img class="media-object" actual-src="{{match.model.User.icon}}" ng-src=\'assets/images/person.png\' alt=""> </div> <div class="media-body"> <h5 class="media-heading" ng-if="match.model.User.name" ng-bind-html="match.model.User.name | uibTypeaheadHighlight:query"></h5> <h5 class="media-heading" ng-bind-html="match.model.User.login | uibTypeaheadHighlight:query"></h5> </div> </div></script></div>'), e.put("app/pages/info/links/links.html", '<div class="links"><div ng-bind-html="text"></div><ul class="links-list mt20"><li ng-repeat="link in items" class="mb20"><a ng-href="{{link.url}}" target="_blank">{{link.title}}</a></li></ul></div>'), e.put("app/pages/obs/add/addob.html", '<div class="container content"><div class="page-header"><h1><span ng-show="add.ob.id">עריכת</span> <span ng-show="!add.ob.id">הוספת</span> <span>תצפית</span></h1></div><div class="add-ob row"><form name="addOb" novalidate=""><div class="col-md-6"><div class="panel main" ng-class="add.activePanel === 1 ? \'panel-primary\' : \'panel-default\'"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(1)">1</span> <span>מה ראית?</span> <span class="fa fa-arrow-left pull-left pointer" ng-click="add.setFocus(99)" ng-show="add.activePanel === 1"></span></div><div class="panel-body"><div class="form-group relative species"><label>שם הזן</label><species-compleate placeholder="הקלד שם זן" model="add.ob.taxon_id" text="add.ob.species_guess" onfocus="add.setFocus(1)" taxa=""></species-compleate></div><div class="form-group"><label>תיאור</label> <textarea class="form-control" ng-model="add.ob.description" placeholder="תיאור קצר על התצפית" ng-focus="add.setFocus(1)"></textarea></div></div></div></div><div class="col-md-6"><div class="panel dates" ng-class="add.activePanel === 2 ? \'panel-primary\' : \'panel-default\'"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(2)">2</span> <span>מתי?</span> <span class="fa fa-arrow-down pull-left pointer" ng-click="add.setFocus(99)" ng-show="add.activePanel === 2"></span></div><div class="panel-body"><div class="col-md-6"><div class="form-group date"><label>תאריך</label><p class="input-group"><input type="text" class="form-control" ng-focus="add.setFocus(2)" uib-datepicker-popup="dd-MM-yyyy" ng-model="add.ob.date" is-open="add.datePicker.isOpen" max-date="add.datePicker.maxDate" datepicker-options="add.datePicker.options" ng-required="true" show-weeks="false" current-text="היום" close-text="סגור" clear-text="נקה"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="add.datePicker.isOpen = !add.datePicker.isOpen; add.setFocus(2);"><i class="fa fa-calendar"></i></button></span></p></div></div><div class="col-md-6 time"><uib-timepicker ng-model="add.ob.date" hour-step="1" minute-step="15" ng-change="add.setFocus(2)"></uib-timepicker></div></div></div></div><div class="col-md-12"><div class="panel location" ng-class="add.activePanel === 3 ? \'panel-primary\' : \'panel-default\'"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(3)">3</span> <span>איפה?</span> <span class="fa fa-arrow-down pull-left pointer" ng-click="add.setFocus(99)" ng-show="add.activePanel === 3"></span></div><div class="panel-body" ng-click="add.setFocus(3)"><cc-map options="add.mapOptions" items="{latitude: add.ob.latitude, longitude : add.ob.longitude, dragable: true}"></cc-map></div><div class="panel-footer"><div class="pull-left"><label>מיקום:</label><div class="btn-group btn-group-sm"><label class="btn btn-default" ng-model="add.ob.geoprivacy" uib-btn-radio="\'open\'">גלוי</label> <label class="btn btn-default" ng-model="add.ob.geoprivacy" uib-btn-radio="\'obscured\'">מוסתר</label></div></div><div class="form-inline"><div class="form-group"><label>רוחב:</label> <input type="number" class="form-control input-sm" ng-model="add.ob.latitude" readonly=""></div><div class="form-group"><label>אורך:</label> <input type="number" class="form-control input-sm" ng-model="add.ob.longitude" readonly=""></div></div></div></div></div><div class="col-md-6"><div class="panel images" flow-init="" flow-name="add.uploader.flow" ng-class="add.activePanel === 4 ? \'panel-primary\' : \'panel-default\'" flow-file-added="!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(4)">4</span> <span>תמונות</span> <span class="fa fa-arrow-left pull-left pointer" ng-click="add.setFocus(99)" ng-show="add.activePanel === 4"></span></div><div class="panel-body"><div class="drop" flow-drop="" flow-drag-enter="style={border:\'4px dashed green\'}" flow-drag-leave="style={}" ng-style="style"><p>גרור תמונות תצפית לכאן.</p><div class="row loaded-images"><div class="col-sm-6 col-md-4 image" ng-repeat="image in add.loadedImages"><div class="thumbnail"><img ng-src="{{image.photo.small_url}}"></div></div><div class="col-sm-6 col-md-4 image" ng-repeat="file in $flow.files"><div class="thumbnail"><img flow-img="$flow.files[$index]"><div class="caption">{{file.name}}<div class="actions"><span class="fa fa-times remove" ng-click="file.cancel()"></span></div></div></div></div></div></div></div><div class="panel-footer tal"><button type="button" flow-btn="" class="btn btn-primary">הוספת תמונות</button></div></div></div><div class="col-md-6"><div class="panel projects" ng-class="add.activePanel === 5 ? \'panel-primary\' : \'panel-default\'"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(5)">5</span> <span>פרויקטים</span> <span class="fa fa-arrow-down pull-left pointer" ng-click="add.setFocus(99)" ng-show="add.activePanel === 5"></span></div><div class="panel-body"><div class="list-group mb0"><button type="button" class="list-group-item" ng-repeat="project in add.userProjects | orderBy:add.projOrder" ng-click="add.toggleProject(project)">{{project.project.title}} <span class="fa fa-check pull-left checked" ng-show="add.ob.projects.indexOf(project.project.id) !== -1"></span></button></div></div></div></div><div class="col-md-12"><div class="panel submit" ng-class="add.activePanel === 6 ? \'panel-primary\' : \'panel-default\'"><div class="panel-heading"><span class="badge pointer" ng-click="add.setFocus(6)">6</span> <button class="btn btn-success pull-left btn-lg" ng-click="add.send()">שלח</button></div></div></div></form></div></div><script type="text/ng-template" id="customTaxaTemplate.html"><div class="media pointer"> <div class="media-left"> <img class="media-object" ng-src="{{match.model.default_photo[\'square_url\']}}"> </div> <div class="media-body"> <h5 class="media-heading" ng-bind-html="match.model.matched_term | uibTypeaheadHighlight:query"></h5> <div class="latin"> <small>{{match.model.name}}</small> </div> </div> </div> <!--<pre style="direction: ltr; text-align: left;">{{match | json}}</pre>--></script>'), e.put("app/pages/obs/single/single.html", '<div class="single-obs container-fluid relative"><div class="row"><cc-map items="item" options="mapOptions"></cc-map></div><div class="container content"><div class="row"><div class="col-md-8"><div class="page-header"><div class="media"><div class="media-left"><img ng-src="{{item.taxon.taxon_photos[0].photo.square_url}}" ng-if="item.taxon.taxon_photos"></div><div class="media-body" ng-if="item"><h1 class="media-heading"><span>תצפית:</span> {{item.ccInfo.name}}<delete-ob ng-if="item.id" item="item" class="pull-left margin-right-5"></delete-ob><edit-ob ng-if="item.id" item="item" class="pull-left"></edit-ob></h1><p class="latin text-muted" ng-show="item.taxon.name">{{item.taxon.name}}</p><p class="user"><span>נוצר על ידי</span> <a ui-sref="user.obs({slug: item.user_login})" class="inline">{{item.ccInfo.user.name}}</a>, <span>בתאריך:</span>{{item.observed_on | date : \'dd/MM/yyyy\' }} <span class="label label-warning" ng-if="item.coordinates_obscured" title=\'מיקום תצפית זו מוסתר ברדיוס של 10 ק"מ\'>מיקום חסוי</span></p><p class="projects"><span>פרוייקטים:</span> <a class="label label-success" ng-repeat="p in item.project_observations" ui-sref="projects.single({slug: p.project.id})">{{p.project.title}}</a> <a cc-wiki-link="item" href="https://he.wikipedia.org" target="_blank" class="btn btn-primary btn-sm pull-left text-white mt5" "="">ויקיפדיה</a></p></div></div></div><div class="main"><p class="mb20 pre-wrap">{{item.description}}</p><div class="fileds mb20"><span ng-repeat="filed in item.observation_field_values | filter: filterFileds" class="filed">{{filed.observation_field.name}}: {{filed.value}}</span></div><div><comments ng-if="item.ccInfo.discussion" comments="item.ccInfo.discussion"></comments><ob-add-comment ng-if="item.id" parent="{{item.id}}"></ob-add-comment></div></div></div><div class="col-md-4 sidebar mt40"><div class="relative"><div class="gallery" ng-if="item.observation_photos[0]" ng-class="{ready: slideReady}"><div class="main-gallery"><div class="slide pointer" ng-repeat="img in item.observation_photos" ng-click="showLargeImage($index)"><img ng-src="{{img.photo.medium_url}}" imageonload="imgLoad()"><p class="text-muted"><span class="inline">רישיון תמונה:</span> <span class="inline">{{img.photo.license_code}}</span></p></div></div><div class="nav-gallery" ng-if="item.observation_photos[0] && item.observation_photos.length > 1"><div class="slide pointer" ng-repeat="img in item.observation_photos"><img ng-src="{{img.photo.square_url}}" imageonload="imgLoad()"></div></div></div></div><div class="panel panel-primary grade" ng-if="item"><div class="panel-heading"><span>זיהוי:</span> <label item-grade="" data="item"></label></div><div class="panel-body"><item-grade data="item" horizonal="true"></item-grade></div></div><div class="panel panel-primary similar"><div class="panel-heading">תצפיות דומות</div><div class="panel-body"><a ng-repeat="sim in similars | limitTo:4" ui-sref="obs.single({id: sim.id})"><img actual-src="{{sim.photos[0].square_url}}" ng-src="assets/images/item-holder.png" width="75" height="75"></a><p ng-show="!similars.length && !loading"><strong>לא נמצאו תצפיות דומות</strong></p><p ng-show="loading"><strong>טוען תצפיות דומות</strong></p></div></div></div></div></div></div>'), e.put("app/pages/projects/partials/list.html", '<div class="row"><div class="col-lg-3 col-md-4 col-sm-6 project" ng-if="list.length" ng-repeat="project in list | orderBy: projOrder"><div class="panel panel-default"><div class="panel-body"><div class="media"><div class="media-left"><a ui-sref="projects.single({slug: project.slug})"><img ng-if="project.icon_url" ng-src="{{project.icon_url}}" alt="{{project.title}}"></a></div><div class="media-body"><h4 class="media-heading"><a ui-sref="projects.single({slug: project.slug})">{{project.title}}</a></h4><small ng-show="project.observations_count"><span>תצפיות:</span> <span class="badge ng-binding">{{project.observations_count}}</span> <span>מינים:</span> <span class="badge ng-binding">{{project.taxa_count}}</span></small></div></div>{{project.description | limitTo: 150}}<div ng-if="!project.description">אין תיאור זמין</div></div><div class="panel-footer" ng-if="project.ccUserSingTo || project.ccUserLoggedIn"><div class="btn-group btn-group-justifieddd" role="group"><div class="btn-group btn-group-sm" role="group" ng-if="project.ccUserSingTo && showActions(project)"><button class="btn btn-danger" ng-click="leave(project)">עזוב את הפרוייקט</button></div><div class="btn-group btn-group-sm" role="group" ng-if="!project.ccUserSingTo && project.ccUserLoggedIn && showActions(project)"><button class="btn btn-success" ng-click="join(project)">הצטרפות לפרויקט</button></div><div class="btn-group btn-group-sm" role="group"><button ui-sref="projects.single({slug: project.slug})" class="btn btn-default">צפה בפרוייקט</button></div></div></div></div></div><div ng-show="list.length === 0" class="col-md-12"><p class="alert"><span class="fa fa-check-circle primary"></span> {{noProjNotice}}</p></div></div><script type="text/ng-template" id="leaveProjectModal.html"><div class="modal-header"> <h4 class="modal-title">אישור עזיבת פרויקט</h4> </div> <div class="modal-body"> <p>האם לעזוב את פרויקט {{project.title}} </p> </div> <div class="modal-footer"> <button class="btn btn-danger btn-sm" type="button" ng-click="ok()">עזיבה</button> <button class="btn btn-default btn-sm" type="button" ng-click="cancel()">ביטול</button> </div></script>'), e.put("app/pages/users/partials/user.obs.html", '<p class="mb20" ng-bind-html="user.description"></p><h2>תצפיות</h2><items-gallery items="items"></items-gallery><div class="tac clear" ng-show="items.length && pagOptions.totalItems > pagOptions.perPage"><uib-pagination total-items="pagOptions.totalItems" items-per-page="pagOptions.perPage" ng-model="pagOptions.currentPage" max-size="5" ng-change="pagOptions.pageChanged()" class="pagination-sm" boundary-links="false" next-text="הבא" previous-text="הקודם"></uib-pagination></div>'), e.put("app/pages/obs/single/comments/addComment.html", '<div ng-if="addComment.show"><div class="panel panel-primary mt30"><div class="panel-heading"><h3 class="panel-title" ng-click="addComment.cece()"><span>הוספת</span> <span ng-show="addComment.comment.type === \'comment\'">תגובה</span> <span ng-show="addComment.comment.type === \'identification\'">זיהוי</span></h3></div><div class="panel-body"><form class="form-horizontal" name="addComment.commentForm" novalidate=""><div class="form-group" ng-class="{ \'has-error\': addComment.commentForm.body.$invalid && addComment.commentForm.body.$dirty }"><label for="comment-body" class="col-sm-2 control-label">תוכן</label><div class="col-sm-10"><textarea class="form-control" name="body" id="comment-body" ng-model="addComment.comment.body" rows="5" ng-required="addComment.comment.type === \'comment\' || addComment.comment.specie === null"></textarea> <label class="help-block" ng-show="addComment.commentForm.body.$invalid && addComment.commentForm.body.$dirty">חובה להזין תוכן</label></div></div><div class="form-group"><label for="comment-body" class="col-sm-2 control-label"><span ng-show="addComment.comment.type === \'identification\'">שם הזן</span></label><div class="col-sm-6"><button type="button" ng-show="addComment.comment.type === \'comment\'" class="btn btn-primary btn-xs" ng-model="addComment.comment.type" uib-btn-checkbox="" btn-checkbox-true="\'identification\'" btn-checkbox-false="\'comment\'"><span>הוספת זיהוי</span></button><species-compleate ng-show="addComment.comment.type === \'identification\'" model="addComment.comment.specie" taxa="addComment.activeTaxa"></species-compleate></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10 tal"><button type="submit" ng-click="addComment.send(addComment.commentForm)" class="btn btn-success">שליחה <span ng-show="addComment.loading"><i class="fa fa-spinner fa-spin"></i></span></button></div></div></form></div></div></div>'), e.put("app/pages/obs/single/comments/comment.html", '<div class="identification discussion"><h3>דיון וזיהוי</h3><ul class="media-list"><li class="media" ng-repeat="item in comments.comments | orderBy:\'updated_at\'"><div ng-if="item.taxon"><div class="media-left"><img class="media-object" actual-src="{{item.taxon.image_url}}" ng-src="assets/images/item-holder.png"></div><div class="media-body"><h4 class="media-heading"><span>זוהה:</span> {{item.taxon.common_name.name}} <small class="inline"><span class="latin">{{item.taxon.name}}</span></small><comment-agree comment="item"></comment-agree><remove-identification comment="item"></remove-identification></h4><span class="pre-wrap">{{item.body}}</span><p><img ui-sref="user.obs({slug: item.user.login})" actual-src="{{item.user.user_icon_url}}" ng-src="assets/images/person.png" class="img-circle pointer"> <span>על ידי</span>: <a ui-sref="user.obs({slug: item.user.login})" class="inline">{{item.user.name ? item.user.name : item.user.login}}</a>, {{item.created_at | date:"dd/MM/yyyy"}}</p></div></div><div ng-if="!item.taxon"><div class="media-left"><a href="#"><img class="media-object" ng-src="assets/images/person.png" actual-src="{{item.user.user_icon_url}}"></a></div><div class="media-body"><h5 class="media-heading"><span class="pre-wrap">{{item.body}}</span></h5><p><small><a ui-sref="user.obs({slug: item.user.login})">{{item.user.name}} <span ng-if="!item.user.name">{{item.user.login}}</span></a>, {{item.created_at | date:"dd/MM/yyyy"}}</small></p></div></div></li></ul></div>'), e.put("app/pages/users/partials/profile/user.password.html", '<div class="user-password"><div class="row"><div class="col-md-12"><p><span>אם ברצונך לשנות את הסיסמא שלך, יש להזין חדשה.</span></p></div><div class="col-md-6 col-lg-3 main-info"><form class="form-horizontal mt20" name="profileEdit" novalidate=""><div class="form-group" ng-class="{\'has-error\' : profileEdit.password.$invalid && profileEdit.password.$dirty}"><label class="col-sm-5 control-label">סיסמא חדשה</label><div class="col-sm-7"><input type="password" class="form-control" name="password" ng-model="formFields.password" required="" ng-readonly="success"><div class="help-block" ng-show="profileEdit.password.$invalid && profileEdit.password.$dirty">חובה להזין ססמה</div></div></div><div class="form-group" ng-class="{\'has-error\' : profileEdit.confirm.$invalid && profileEdit.confirm.$dirty}"><label class="col-sm-5 control-label">אימות ססמה</label><div class="col-sm-7"><input type="password" name="confirm" class="form-control" ng-model="formFields[\'password_confirmation\']" required="" ng-readonly="success" compare-to="formFields.password"><div class="help-block" ng-show="profileEdit.confirm.$invalid && profileEdit.confirm.$dirty"><div>ססמאות לא תואמות</div></div></div></div><div class="form-group"><div class="col-sm-12 tal"><button type="submit" ng-click="saveProfile()" class="btn btn-primary btn-sm" ng-disabled="loading || success"><span>איפוס</span> <span ng-show="loading"><span class="fa fa-spin fa-spinner"></span></span></button></div></div><div class="alert alert-success" role="alert" ng-show="success"><span>סיסמה שונתה בהצלחה</span> <a ng-click="success = false">ערוך שוב</a></div></form></div></div></div>'), e.put("app/pages/users/partials/profile/user.profile.html", '<div class="user-profile container content"><div class="alert alert-success" role="alert" ng-show="!scopeLoading"><span class="fa fa-spin fa-spinner"></span> <span>טוען פרטי משתמש</span></div><div class="row" ng-show="scopeLoading"><div class="col-md-10 col-md-push-1 main-info"><form class="form-horizontal" name="profileEdit" novalidate=""><div class="row"><div class="col-md-6"><div class="form-group"><label class="col-sm-3 control-label">שם משתמש</label><div class="col-sm-9"><input type="text" class="form-control" disabled="" ng-model="formFields.login"><p class="help-block">לא ניתן לשנות שם משתמש.</p></div></div><div class="form-group" ng-class="{\'has-error\' : profileEdit.name.$invalid && profileEdit.name.$dirty}"><label class="col-sm-3 control-label">שם מלא</label><div class="col-sm-9"><input type="text" class="form-control" name="name" ng-model="formFields.name" placeholder="שם מלא" required="" ng-readonly="success"><div class="help-block" ng-show="profileEdit.name.$invalid && profileEdit.name.$dirty">חובה להזין שם</div></div></div><div class="form-group" ng-class="{\'has-error\' : profileEdit.email.$invalid && profileEdit.email.$dirty}"><label class="col-sm-3 control-label">דוא"ל</label><div class="col-sm-9"><input type="email" name="email" class="form-control" ng-model="formFields.email" placeholder="דואל" required="" ng-readonly="success"><div class="help-block" ng-show="profileEdit.email.$invalid && profileEdit.email.$dirty">כתובת דוא"ל לא תקינה</div></div></div><div class="form-group"><label class="col-sm-3 control-label">תיאור</label><div class="col-sm-9"><textarea class="form-control" rows="5" name="description" ng-model="formFields.description" ng-readonly="success" placeholder="כמה מילים על עצמך...."></textarea></div></div></div><div class="col-md-6"><div class="form-group image"><label class="col-sm-3 control-label">תמונה</label><div class="col-sm-9"><div class="image-holder" flow-init="" flow-name="uploader.flow" flow-file-added="!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]"><div class="drop" flow-drop="" flow-drag-enter="style={border:\'4px dashed green\'}" flow-drag-leave="style={}" ng-style="style"><img ng-hide="$flow.files.length" ng-src="{{userInfo.medium_user_icon_url}}" class="img-thumbnail"> <img ng-show="$flow.files.length" flow-img="$flow.files[0]" class="img-thumbnail"> <button flow-btn="" class="btn btn-default btn-sm">החלפת תמונה</button></div></div></div></div></div><div class="col-md-12"><div class="form-group"><button type="submit" ng-click="saveProfile()" class="btn btn-primary" ng-disabled="loading || success"><span>שמירה</span> <span ng-show="loading"><span class="fa fa-spin fa-spinner"></span></span></button></div><div class="alert alert-success" role="alert" ng-show="success"><span>פרטים נשמרו בהצלחה.</span> <a ng-click="success = false">ערוך שוב</a></div></div></div></form></div></div></div>')
    }]);
//# sourceMappingURL=../maps/scripts/app-b4aedcc79d.js.map