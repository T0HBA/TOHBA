export default class Config {
    data = {
        airBreakData: {
            ID: '0',
            movementData: {
                forward: {
                    bind: {
                        keys: [ 'KeyW' ],
                        state: false
                    }
                },
                back: {
                    bind: {
                        keys: [ 'KeyS' ],
                        state: false
                    }
                },
                left: {
                    bind: {
                        keys: [ 'KeyA' ],
                        state: false
                    }
                },
                right: {
                    bind: {
                        keys: [ 'KeyD' ],
                        state: false
                    }
                },
                up: {
                    bind: {
                        keys: [ 'KeyQ' ],
                        state: false
                    }
                },
                down: {
                    bind: {
                        keys: [ 'KeyE' ],
                        state: false
                    }
                }
            },
            toggleStateData: {
                bind: {
                    keys: [ 'ShiftRight' ],
                    pressed: false,
                    state: false
                }
            },
            typeData: {
                state: 'default',
                default: {
                    bind: {
                        keys: [],
                        pressed: false,
                        state: false
                    }
                },
                airWalk: {
                    bind: {
                        keys: [],
                        pressed: false,
                        state: false
                    }
                },
                simple: {
                    bind: {
                        keys: [],
                        pressed: false,
                        state: false
                    }
                }
            },
            speedData: {
                state: 70,
                inc: {
                    bind: {
                        keys: [],
                        state: false
                    }
                },
                dec: {
                    bind: {
                        keys: [],
                        state: false
                    }
                }
            },
            smoothData: {
                state: 1,
                inc: {
                    bind: {
                        keys: [],
                        state: false
                    }
                },
                dec: {
                    bind: {
                        keys: [],
                        state: false
                    }
                }
            },
            killZoneData: {
                state: true,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            }
        },
        removeMinesData: {
            ID: '0',
            state: false,
            type: 'ALL'
        },
        noKnockbackData: {
            ID: '0',
            mply: 1
        },
        otherData: {
            ID: '1',
            autoHealingClicker: false,
            speedHack: false,
            freezeTanks: false,
            noCollision: false,
            rapidUpdateData: {
                state: false,
                delay: 150,
                warning: false
            },
            showAlert: true
        },
        syncData: {
            ID: '0',
            antiStrikerData: {
                state: false,
                type: 'Enemy',
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            randomTeleportData: {
                state: false,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            antiMineData: {
                state: false,
                height: 200,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            }
        },
        wallHackData: {
            ID: '0',
            tankGlowData: {
                state: false,
                onlyEnemy: false,
                colorEnemy: {
                    dec: 10027085,
                    rgb: [0.6, 0, 0.3]
                },
                colorTarget: {
                    dec: 6750054,
                    rgb: [0.4, 1, 0.4]
                },
                colorTeam: {
                    dec: 10066431,
                    rgb: [0.6, 0.6, 1]
                }
            },
            tankChamsData: {
                state: false,
                onlyEnemy: false,
                colorEnemy: [0.6, 0, 0.3, 1],
                colorTarget: [0.4, 1, 0.4, 1],
                colorTeam: [0.6, 0.6, 1, 1]
            }
        },
        clickerData: {
            ID: '0',
            autoHealingData: {
                state: false,
                delay: 10,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            autoArmorData: {
                state: false,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            autoDamageData: {
                state: false,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            autoNitroData: {
                state: false,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
            autoMiningData: {
                state: false,
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                }
            },
        },
        weaponData: {
            ID: '0',
            strikerData: {
                aimBotData: {
                    state: false,
                    bind: {
                        keys: [ 'KeyN' ],
                        state: false
                    }
                },
                shellsTeleportData: {
                    state: false,
                    bind: {
                        keys: [ 'KeyR' ],
                        state: false
                    }
                },
                getTargetForAimWithScope: {
                    state: false,
                    bind: {
                        keys: [],
                        pressed: false,
                        state: false
                    }
                },
                getTargetForTPWithScope: {
                    state: false,
                    bind: {
                        keys: [],
                        pressed: false,
                        state: false
                    }
                },
                nextTargetData: {
                    bind: {
                        keys: [ 'Numpad6' ],
                        pressed: false,
                        state: false
                    } 
                }
            }
        },
        cameraData: {
            ID: '0',
            state: true,
            bind: {
                keys: [ 'KeyV' ],
                pressed: false,
                state: false
            }
        },
        stickData: {
            ID: '0',
            nextTargetData: {
                bind: {
                    keys: [ 'Numpad4' ],
                    pressed: false,
                    state: false
                } 
            },
            deactivateData: {
                bind: {
                    keys: [ 'KeyB' ],
                    pressed: false,
                    state: false
                } 
            }
        },
        spectateData: {
            ID: '0',
            nextTargetData: {
                bind: {
                    keys: [],
                    pressed: false,
                    state: false
                } 
            },
            deactivateData: {
                bind: {
                    keys: [ 'KeyB' ],
                    pressed: false,
                    state: false
                } 
            }
        },
        filtersData: {
            ID: '0',
            'blur': 0,
            'brightness': 0,
            'contrast': 0,
            'grayscale': 0,
            'hue-rotate': 0,
            'invert': 0,
            'saturate': 0,
            'sepia': 0,
        }
    };

    clearCookies = () => {
        for (let key in this.data) {
            localStorage.removeItem(key);
        }
    };

    saveState = (state) => {
        localStorage.setItem(state, JSON.stringify(this.data[state]));
    };

    saveStates = () => {
        for (let key in this.data) {
            this.saveState(key);
        }
    };

    constructor() {
        for (let key in this.data) {
            let result = localStorage.getItem(key);

            if (!result || (result = JSON.parse(result), this.data[key].ID !== result.ID)) {
                console.error(`[SHIZOVAL] ${new Date().toJSON().slice(11, 19)} - No config found - ${key}`);
                this.saveState(key);
                continue;
            }

            this.data[key] = result;
        }

        if (this.data.otherData.showAlert) {
            this.data.otherData.showAlert = false;
            alert('Используйте только на тестовом сервере и только в режиме паркур!\nUse only on the test server and only in parkour mode!');
        }

        this.saveStates();
    };
}