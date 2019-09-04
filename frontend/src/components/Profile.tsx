import React, {Component} from "react";
import {Link, match} from "react-router-dom";
import {ProfileDetail} from "./ProfileDetail";

export interface  ProfileState{
    name: string,
    surname: string,
    givenName: string,
    image: string,
    superviserId?: number
}

interface IState {
    profileList: Array<ProfileState>
}
interface ProfileParams {
    id: string
}
interface IProps {
    required: string;
    match?: match<ProfileParams>;
}
export class Profile extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            profileList: [
                {
                    name: "John",
                    surname: "Doe",
                    givenName: "MP",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAF8pJREFUeNrtXXlUU/e2dr3/BazS997ta+t9712tA8goioKICCIVmQQnBNTqa2+99XawtYPiWEeg4qyVQXEW1DqAiFEcmA2IM2KAMk9xvlaL++19zgmEkJAEMpzgOWt9C9dSSOT79re/vX8nSa9ewiVcwiVcwiVcwiVcwiVcPeGq+DTMDRGOiESkIEQICQIIZeFTlEL299y/FXHfG8n9LDfhN8tPsvtzBMUhxBXzQxkyJdN84WGQN5ROGgsPfMZAiYeTVqDvoe+ln0E/ixEI/mzmMdjHosfsLzBgHNJtENFERvnc6SCZ4QcPAzzhgfdorYnWWhj4GPRY9Jj02Jwg6LnYCMzov9LJjiXls6cyldmVyta5IPA50HOh58S1jkjBGXRLvB/1Y6bSQ3wMUuXdcQd6jpwzUIbwExjsOvHUYyXUe0v9PHhLuirQc+aCJblCuMColsRTj+VztWvlCvh/EYSgmdX3GOLVCEFoDQrhTkR2yYdQZ4jQyLUG0VsfFvEXsLBi/kwpjVU9nXhF0P+Z/u/0O3jriC//dBZb9aGBUOLp/NaR3wr8v9Pv4K1yg/JPQ8PL582Qlk4e9/YSr2Ri4NygZ4dEyf+FRj8MC4R740fA/XHDBfIV3YDNBtE9jvjSeTMtSufPFJeE+MAdd0e4O84R7qEA7gvEdwCdO3DrZYseQf6DT2bYlM6bIb472R1ujbVHATjAXXcSgKPgAp0FRFYEpn2+cP+T6Tb3Z4dIb3k5w003O0YAt8c6KLiAIAJV4yKXC0xTBPc+mWZzb3awtNhzBNwYYwvFKICbbvYdRCC4QA8Uwd25U23uzPSXFiHBRa42cgKQdwFZKxguiEDNBrEcXdRkRHB7TojN7VkBUjGSLnYdBoUogCL8c2cuIARC9RNC+dzp/BfBrdnBNrfCg6TXkdQCF2sQuwxrJ4LiMYIL9Nh2cDNiikVxWKC4AEnNH20FBaOt4TqJQKkL2Aku0EURlM+byc8R8UbEFHEeJvrcUUMhb5QVKwIXEsGwTluBMBZquTWcNJYZEXlFfmHElOjcCc6Q7TwEclAAJIJ2LuAiE4AGgVAYCzXdE/BjY1gQFhSe6+8BV0cOhiwUAImgnQuMVu8CwljYhY0he2+Bcc8OsmcF9s8KmSi95DwULqMArnEiyJGJYDSJwLo1EDICEMZC3U0G7HhovFPEy9N9RRlI6AWnjyBzxCC4IucCOYwLDBUCof5Docgo5CfNDohM9RwJZ4cPhPMogItOg9AFBqluBUoCofxYKATCLuaBIG8w+E0lY04s7j8n5u/SJPsBcNpxIKQN/4hxgUucC1xzHqzaBdQGQkchEGqJsrAgw7aCUSmLRP33zoHPg0dDssMAxgXSUQQidAFqBUIgNMK62FCtAKvfb+CBT8H816kwdOssiELSTzIuMBAyOBeQBUK1Y6EQCHU3FYT4gEHuNh6R/LWEyCdYxs+EmXM9YJfd35hWwLpAx0DY0QWshXMCPaB87jSJvqs//K9Jc0EmAMJ/x0XAcpehkGg/oEMgVDcWGvKc4B6iGH9OwVhHyO+hEE/2gKJ5ofrbDTge+1IiTz7hnT3TwT0yELbY/g32oQhStQmErhoEwm64QJH7cMjFX8zlaZMhO3IxiLf+AiXnzjKorqqE2poaqKqshIqyMrhzIR3uXzgPhQc2Q8Gu7yFn1ceQtQiF+x2LvMX4/L/H548o+IHFdYT4x6FQSPiJRdGSoXBjKYvipVZQHGkFNwnLrOAW4vZyFndWWMHdlQRruLeKxf3V1lBC+NkaHiBK17B4uGYYSNayKFtnw6B8vQ1UbGDx+0YbqERURdlCwz5/id6q/73EcFAUAOG/4sNhkbcD7MZWcABD4bnhHcfCHA3GQl2cE9wZ58RUQ2bENLiR8CtU3LsLTY2N8PjxY60gbW6G2opSeHglHm4nhMDtmMFwb9MQBvdjh0AJ4sFmxBbE1iFQini4bShItrMo2zEUyneyqNg1FH4n7LaCSsKvVlC1xwqq46yghhBvDXUJLOoTWTTss4ZGQtIwaEI07x8G0gM2ID2IOGQDjxFPjtjC06O28OyYLTxPZvHi5Ch4KZoebpDql6HPnmngEDMDYm0HQAK6wCEHthUocwF9nROQxWe7OcLVbxZAaX5ul0jvTAxVDwrhzrEv4M7moVCCRD9Akku3W0HpDit4uNMKJIiyXdZQttsayhEVvyL2WMPvcSwqkeQqRHXCMKhJHAa1e1nU7WNRjyQ37LeBBiS5EdGERDcjyc2HkXDEoyNIOBL9LMUOnh+3g3+dQJxk8fKkfRt+s4c/RIESnSd/xd6viH+PC4XQTygQDoC96AJHMBTKNoT6Hgupr2d98w+GeKm0WWfEK+LRo0dQXVoI944vhBIiHqtZgtVcRkCyywlIckX8MPgdia5EoqsQ1XttoHqfDdQQkmygFomuIxywhfqDaNuIxkOIw7bQhGjGym4+agePk+3gKZL9gog9hcSelsEB/jijBGcJjvBHhge8uhaqu4nAKflrUWfkyzB4+yxY7zSYcYEkFMExFIHISWEs1OE5Adn9NX8vuPnbcb0Sr0wIZYVn4W6CB0jihiHpw6ACCa9AsiuR7CoCkl2FZFcj0TX7baEWya5FousO2kH9ITtoIBxh0YhkNx2zB2myPTw5YQ8vTrGEvkpl8TrVkUWaEpwb3oZ0OWRNFels6yeb+9WhX9wM8Pt6EuzAVrAXRXAQW0GKI+YBrQKhZucEt/ArVX3VgxKNiSupfAxXbz+BnelPlYL+jv6Npj+vvroMSk79EyQJGMT2sahE0quQcEI1kl6DpNceYlF32A7qkPD6I/bQcNQeGpHwRycc4BkS/hKrt41UZVAg+Lw8nOB1Rnv8ecUHWvLC++tCAJE072siAMIHGAi/m+gI8dgK9qMLHEYXOIGhMFPLQNjZOcF1Gns2R0F9fZ1aks6Jn8DK5KcwNfYZuK/SDPRv6Xvoe9X9/OamJnh4eQs8TLCFyv12UHXADqqxyquxwmuQ8FoCEl5HQNKbjzvA09+IcEf4E4n9E8nsgPMyOLHIkMMFGUa0QdSGFsLFkdCS6QotBRGR3RaA9eEFEk3JlwVC9xVTYBu6wD7OBY6iCH5DEVzWQSDMd3OAgt3b1Fp+Ss4TrUjvTAz0s9S1hIdZcSDZZ8sQX33YHslHHGGr/DES/gIJf53uKEeuHDKGKyGYg8ipHcEMLrJouciRfUkBmRxyuxkGsfpt1IU/ZfhLfBh8NtWFdQEUwWEUQTK2gtMYCq90IxAW4Nd8NeRT1eqCeGVC6MwRGBFkx0PFAaxysvXTGMbOOaogWwXhIiWEtyN7hHKiW+EMLZflkO0NLYURNt0RQDQterQVAGHI9jCIwkDIugAbCI+jC5xxYluBtucEYkR+bJRK8qvrH8PiA091Trwi6DHosVSJoCZvK7xM0xHhqipbRrYi4VdkGMXiqgu0FM3u+q1jVoc+F3eFfNk5waz54+FXzgWOMIFwIJxEEZxFEchagSbnBEVIftbXn6vs+YWlT2DODv2TLwM9Fj2mqkxQe+kbeJWuuZ13qboVCb/aHm9kKAgSdzn9d8X+5fHXhNmw2tWacQFaDpELnMBWcApbQdoIEoFm5wRXfcdBpYq0T0RM2vDMYOTLQI+pSgSNtWXQlOajWzu/rFjdSsi+Nro9shB5PvDmxtz+XVr9apP+lYHax9jlQbATXeCA/cB2LnAaXeDcCG4q6OTGkTxqBSeTeUW+JiKouZsGz9KcdGjnagjPUoQLvMlG5LjDm+K54V1Z/cZ1h3z5c4LFPo6QaKfgAlwrOD9icKe3j1376jOlfZ/6sCFtv7N2oCwTUB6ovbwIBaBDO1dJuEsb4TLkyOCKDhAap7UABh38TKwLAdBYaL8pFLbLucBxbiykQJiGyGBE0DEQZuPXB3k5SivMEIFPm2Co7DnWld+Ax6kjul/d2hKe2x5QGKh9Dvjf/fNAFwJoPSeY79F6UJSMOEljIYoglWsFFxA5CoHwqorqp3GML+TLoGxEZKaCK9/C68zuVPfojmSrI5yQN6YNhX6gbf93U3X021UM2hkGMUjyAVoMMS6AbcCxzQXSSQQjh0A2FwhzECUqql8fc74u9gRKXaDiBjzLcG5PeHeqO0cJ2YqE5ytA7A1wZ56bVgFQl+TLzgn8v/WFOC4L0GKIXOAM5wLpI9hWIBrJhsKrswKVHunSVo5v5MugbGNIR8l1F2frtro7I7zATTnuzNM8CNof/WekrgXAnhNEMIGQ9gJHuTMCtg18hG0AA+FIcoHBcAlDYVHcTpOpfrUucCsJXmaOUkN4F6tbFeGKuBUaqc3+P0UfAmDOCVYFw267tvUwEwaHD2L2AukjBzECICGU37trEr1fkyzQUCOBp6JRurFzTQlXRPHUFI0F8OG+OSJ9CIA5J0gIgwXTXYFeVEJZ4AQTBge1tQFygaAJSu2fTuj4LgB6jh3CoFQKjZkzdGfnXUHhJJE2E4BEXwJgbhzZEQax2O8Pc4shcoGzwwexbYBGwp++Njn7V9cG6gt+ZipeL9WtCYr8ND8Z7O4KWJNzgrBPPWGvnbwLfNQ6DeTGblR6MwffyZdB2U0lDXcS4VWWq2HIVioAX81HQV2PgErPCRLnwLox1q0ucIpzAWoDJWmnO/wC6W4dUxEAPVfF599UfhleXDUC8a0tYCK/BEDnBN5L/Jl7Bo5xLnCGc4HbqR0FQLdsmYoA6Ll2OCWszIXnggDa472EcPhx0nA4iIFQ5gKp6AL0oo2eJoCmpiYTEkBcmEEEwJwTbAmFPQouQK/Y6XEO0NwML7InGE0Ar/MngOvA//k3jQTw7q7pBhEAc04QHwrz57gzy6EUFMFpFIGyFC0IoHt4mT1OcwfosyPYYAJgzgl2h8NmTP/HHAYwLzXviQKgFmBUAWSN4a8A6JwgYPFkSMJWcBxdoCJT1CNDoCCATvB+YgSs8rKDo9gKypUIwNTHQEYA18aYhgDe2TrF4AJgzgnWBDPvM3Bzz44etwhqLEmBVznGE8CzK9oIYMsUiaEFIDsn+CLUFbJXL+1xq+DGm1vhTb6b0QTwNNNV81Vwn21TRMYQAMEWx8J9oX5Kf4mmfBjUnPcP4+0AEM+vjtH8MKjvpsAUYwmAzgki/u4FjUqWQaZ6HNxUXwnPsycZVQBNGS6aHwf3iwmINJYACPQWdJmpx3rMDSFND1PhjxwPowqg7pyL5jeEvLveL9yYAqBzgvATq1S+6NOUbgkj+2+6/pNRySdUnBodro0A3IwxCrY7J0gMh7u1ZSZ/U2hjzX34V66fUcmnERAF4KbVncE4CRhVADQWLszcqfIVwKZyW3jjzS3Qku9uVAE8yXQFrV8X0Dc2SGxMAcjOCVS5gCm8MISq/3leiNHtX3rRVfsXhlhGB8QZWwCEBZe2q3w5ON9fGtZ0awu8KRhvdAHUprlo/9IwCoIWu0KMLgA6JxBJxCb34tD68lx4mR9kdPJf52oZAOUE0N8YK2FlcDjyJVQ11ZnOy8Prq+CR+FuA6+5GFwD1fxRA194squ+mQDEfBED44tIOlW/Pwrs3iCjeAS2FfkYnn1kAXXDt+ieMoQtEm+/mhwBoN7C98LRKEfDlLWIK8g7DqxtzeEF+Sx5j/9HdEYANX9qALA/sv31B7dvCGetNouLPHYWSy3OZ++/4IAA6AUQBdO+TRvv9EijhiwAI/5EwS60IjPE2cXHpx2B9fAi8uTmTF+QTGjNcuv+ewegCkXyYBhRF0Fk7MPQbRcamJcFH3/tAQz5a//XxvCCfS/+RuhBA/76bg3glAFk7+DJzl8rpwBBvFVtWVQEL9q8Fy8UTIO5wMEDxFN5U/+NL3Uj/HZZCUf4ivglAti52Tl6kck+gzzeLTi3IBOeYT6DPTxPAeZkXvC6ew4uxT4aaVBfdfYgUuoAfn8KgsjuJyA1UrY11SfyNB7dhweH18N5qf7CInAAW346HjNRQgCJ/3pDPhT/dfoCUZXSAhK8CkLnBB3vnwFeXd+tcCFKpFG6U3oEvjkZB//XB8M7Kj8FimTdY/OgJIRt9oOVmBG/I51a/uv/YGFoNG/uIWNN9wXuJERCStpaZFrTJCIqkP/y9DBKyTkFw0hJ4f2Mw9F0zGSxWIfkrJoLFUqz+bzyg5GoEb8Y+uaNf/XxwFN9dQNlp4vt7Z8PEU8sgMjsJdhSdYfKCfGagFN9QVwfpd3Lg3P1c2JydDN+f3wXee7+DDzdNh/+MngJ91k2GPmt8wWI1kr/SB8yp+n/whOV7Ang19umt+uVdgM9ZQF2LoPsNKS+QQygD/Z3lnhnwzmYkfWMA9NngBxbrserXIvk/TwJzrH7z5RPBHKv/w8We0FDAn7FPrvfr9yPlcSKQmKIANMLuEDDfFQwWMYFgsRFDHgkAq98Cq98cq998JZK/bAKYLx4P8Uen8mrsI1Snuuj3gyNlEwEf9wI6AS28dkwBiyiOfKb6J4M5U/1o/Su8sfq9wBkzwOub/Br7uLlf/x8dy7jARn8R37aDOqn+nRhytwS1q35zheq3+G48XEjj19hHW7/KM6MN8+HRsu1gv5gAaU+rfjOsfvNNASgAqn4/tvrXcNW/HKt/iRdMjfaFllv8Gvvq012kOtv6aSGChca+cVTX1W+2He0/upPqX+QBD67xa+zjbviI7GWMi2kFO028FdD9Dhj8qPrNtsrbP5K/BslfzfX+H71gRXwQr8a+V9ljDGv9ylqBZTS2gt0mHvy46jePDeTsH6t/LVr/z23V/8H3ntDIo7GPbvbAmd/w1q9sN9B3U6BpWz9V/zacbGKo+ie3Vb8s+f/gCQnH+DX2NWW46n/m1+bWMZNcEDFjH1V/ENq/YvX7sNUfOQFG4dc/eTT2cQuf6F58ulAEYlM4K1AW/Kj6zTYHMNVvrtD7LRaPB9E5/ox93K5f3ItvFwrAwnKDv9hkQiE39smq3/wXtP/1vu17/1Ic+2J84Q1Pxj4u9IlRABa9+HjRTaTvbvCX8l4Eu+SrPxDMtmD1R2H1kwBo7pcl/289oDSLH2MfR7602zd5GkIEOB7ydzLg9v2y4EfVb7ZZSfUv8YKVifwY+yjxV5914T/57USA4yEv18UKwY+q3yzGD8yw95ut/RjMVk8EsxU49v3oCU3X5xp97KM1LzfumQb5vG4HCmMfQ36sP5ih/ZutmwRmmPzNVnqDGZKfmDLN6GOfydi+yYhAIfhR8jfbhNW/Aat/DVf9y3Hsw68tt+YadewzefLbiQBHRKPvCRTHPq76ezP2z1X/Klr6jIeL54079nFzvtjkyZcfEUkEfWODjL/vlwt+VP29o+R6/zIvmLbJuGOfVOQqI9+iV0+7aGPYLyYADD4hyI99suDHVD/2/g1tvd98sQdIsmcbZeyjpF93zoV/Gz59nB1QLuizLdh4wQ+rv/cvWP3RXPX/jMEv0gtW7cXQdzPU4OTTR8lw/T6819tw0SkiQtTvl0D9u4HS4MdWf++NWP1r0PpX4ti3xBOaCw079lHVN5xnql5k9FM9IwlhIbmB3gKiquDHVX/v9dT7sfqR/L3HDTv2UdDjqn5hr7f5anUDzAY6HRflg5/C2Nda/WvZ6h+FLvDGQGMfHeZwvf7trPrO7jZGSOjeAp1sEJXs+9tV/wbq/ROZpU9mhv7HPtrocWf4kto0Fz+B8c5CYneFoBj8ZGMfkR/jy1R/77U+zMp3WqwvgB7HPnni35qQp0shUGvQemJQ3Pdvbhv7ekdNYnp/b0r+P4yHslz9jH2U7DmrF4jXQWsQWW70B3pBilpXUDP29d6I5K+bCL2Xe8HqJN2OfVTt9AKN6rOtPV6weh2HxUhyBcuoAKBb0pWGRhX7/rbq94Hea7zh/aVeINXB2Ec7e7o1uyattdojhXBnmPOFaFovM86AeYFGSQu6JU1N8Ou9ll357jvZtbGPqpxGOOrrXKXT2ja6x+ztTdQZKC/EvbvOV2y51hf6rp8M72yYDH02+oI5HfXiV/neP3qdD8Dtzsc+qmwa2ai6aT9P/RzndhnhcdTXhUrn6WW5epKb5SqfcMsVEyP7LfNO6Rc5QdRviaekH4Y+y6/c4eSxEKi78DFDqjyQUBkkXA9P4Sw9XOv32xcu4RIu4RIu4RIu4RIu4eLr9f/F2pRA/8AOewAAAABJRU5ErkJggg==",
                    superviserId: null
                },
                {
                    name: "Johnny",
                    surname: "Depp",
                    givenName: "UM",
                    image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iOTYiCiAgIGhlaWdodD0iOTYiCiAgIHZpZXdCb3g9IjAgMCAyNS4zOTk5OTkgMjUuNDAwMDAxIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc4IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjIgKDVjM2U4MGQsIDIwMTctMDgtMDYpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJsaW51eG1pbnQtbG9nby01LnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIiPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQzMzEyLTUiPgogICAgICA8c3RvcAogICAgICAgICBpZD0ic3RvcDMzMTQtMSIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojYzdmOTk0O3N0b3Atb3BhY2l0eToxOyIgLz4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3AzMzE2LTUiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6Izg3Y2YzZTtzdG9wLW9wYWNpdHk6MTsiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQzNDMxLTEiPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojM2QzZDNkO3N0b3Atb3BhY2l0eToxOyIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBpZD0ic3RvcDM0MzMtNyIgLz4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MC4xMTQwMDY1MTsiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3AzNDM1LTQiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iNS42IgogICAgIGlua3NjYXBlOmN4PSIxLjM1MTA2MTQiCiAgICAgaW5rc2NhcGU6Y3k9IjgzLjQzNTA4NCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSJ0cnVlIgogICAgIHVuaXRzPSJweCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI1NjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTM4NyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkNhbHF1ZSAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNzEuNTk5OTgpIj4KICAgIDxnCiAgICAgICBpZD0iZzQ4MjQtMy00LTgiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjEyOTU0OTA5LDAsMCwwLjEyOTU0OTA5LC02My4wMjkwNCwyMDguODU1NDkpIj4KICAgICAgPGcKICAgICAgICAgaWQ9Imc1MTU5Ij4KICAgICAgICA8cGF0aAogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2Njc2NjY2NjIgogICAgICAgICAgIGlkPSJwYXRoMjU3Ni0wLTMtNy00LTgiCiAgICAgICAgICAgZD0ibSA2NzEuOTA5NTYsNjQyLjk3MzUyIGMgMCwtMjUuMjA4MDkgMCwtODQuNjczODggMCwtODQuNjczODggMCwtMjguMjg4NTQgLTI0LjgwOCwtNTEuMjE5OTEgLTU1LjQxNzE1LC01MS4yMTk5MSBoIC0zMS43NjkzMyB2IC0wLjA2ODMgTCA0OTguNzk5MTMsNTA2LjYzNiB2IDMwLjg5NDcgYyAwLDAgNy4wMTU3OCwwIDEzLjE4OTg1LDAgOS4yMDY4MiwwIDEwLjgzMzMsNi4zNTU2MyAxMC44MzMzLDE1LjE1MjU1IGwgMC4wNjgzLDU0LjYxODM2IGMgMCwyOC4yODg1NiAyNC44MDgxLDUxLjIxOTg4IDU1LjM4MzA5LDUxLjIxOTg4IGggNzUuNDg5NTYgYyA5LjY3NzgyLDAgMTguMTQ2MzUsLTYuMTI4ODcgMTguMTQ2MzUsLTE1LjU0OCB6IgogICAgICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtvcGFjaXR5OjE7ZmlsbDojODdjZjNlO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDoxLjEyNzEyNTI2IiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgICBpZD0icGF0aDQxMzAtMy01LTMtNCIKICAgICAgICAgICBkPSJtIDU5My4yMjM3MSw1MzkuMjQwNzkgYyAtNi44ODg5NCwwIC0xMy4wMDk5NywyLjU1NzYzIC0xNy45MjgxMSw3LjUyNTggLTQuOTE1NjksNC45NjU1IC03LjQ5NjcyLDExLjE2NDU2IC03LjQ5NjcxLDE4LjE2MDM5IHYgMzUuMzYyNDQgaCAxNi4wMzk0NSB2IC0zNS4zNjI0NCBjIDAsLTIuNjgxNCAwLjg3NDkyLC00Ljc3ODA2IDIuNzg5NDQsLTYuNzEyMDIgMS45MjA4MSwtMS45NDAxNiAzLjk1NDg0LC0yLjgxODQ3IDYuNTk1OTMsLTIuODE4NDcgMi42OTY0NCwwIDQuNjk5OTUsMC44NzM4OSA2LjYyNDk3LDIuODE4NDcgMS45MTQ1MywxLjkzMzk2IDIuNzg5NDcsNC4wMzA2MiAyLjc4OTQ3LDYuNzEyMDIgdiAzNS4zNjI0NCBoIDE2LjAzOTQyIHYgLTM1LjM2MjQ0IGMgMCwtMi42ODE0IDAuODc0OTUsLTQuNzc4MDYgMi43ODk0OSwtNi43MTIwMiAxLjkyNTAxLC0xLjk0NDU4IDMuOTI4NTIsLTIuODE4NDcgNi42MjUwMSwtMi44MTg0NyAyLjY0MTEsMCA0LjY3NTA5LDAuODc4MzEgNi41OTU4NywyLjgxODQ3IDEuOTE0NTMsMS45MzM5NiAyLjc4OTQ4LDQuMDMwNjIgMi43ODk0OCw2LjcxMjAyIGwgMC4wODcxLDQxLjMxOTIzIGMgMCw4LjgxNDE2IC04LjM5Mzg3LDE2LjI0MjcgLTE5LjE3NzU3LDE2LjI0MjcgbCAtNDcuMjEyNzksLTAuMjAzMzUgYyAtOC4zMjE3OCwwIC0xNS40MjkyNSwtOC4wOTk5NSAtMTUuNDI5MjUsLTE4LjUwOTI5IHYgLTc3LjgwOTk1IGggLTE1LjE2NzY4IHYgODAuODAyNzYgYyAwLDguNTczMTUgMy4xMzcxMywxNi4wOTExOCA5LjI0MDExLDIyLjE3MDU0IDUuMjE2MzYsNS4xNDg4NyAxMS40ODk3Niw4LjQ4NjQ2IDE4LjUzODMxLDkuMjQwMjYgbCA1My4wODIzMywtMS4zZS00IGMgOC44NDk2OSwwIDE2LjYyNDU1LC0zLjI5MDU5IDIyLjg5Njg3LC05LjY3NjE5IGggMC4wMjkxIGMgNS4zMzQ1NCwtNS40ODA3OSA4LjQ1MzE0LC0xMi4wNDggOS4yMTEwMywtMTkuNDM4ODkgbCAtMC4wNTgsLTQ0LjEzNzY5IGMgMCwtNi45OTU4MyAtMi41ODA5NSwtMTMuMTk0ODkgLTcuNDk2NzEsLTE4LjE2MDM5IC00LjkxODA4LC00Ljk2ODE3IC0xMS4wMzkxNiwtNy41MjU4IC0xNy45MjgwNywtNy41MjU4IC02Ljc2MjA2LDAgLTEyLjY3ODg3LDIuNTE0NSAtMTcuNDYzMjUsNy4xMTg5MSAtNC43NzA0LC00LjU5NjgzIC0xMC42NDU4NiwtNy4xMTg5MSAtMTcuNDA1MTIsLTcuMTE4OTEgeiIKICAgICAgICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjEyNzEyNTI2O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJzc2NjY2Nzc3NjY2Njc3NzY2NjY2NjY2NjY2NjY2Njc3NjY3MiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icGF0aDQyMTAtOC02LTUtNy0zIgogICAgICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuMTI3MTI1MjY7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgICAgICBkPSJtIDU3Ny43NzE3MSw2NzAuMjQ3MSBjIC0zNi40NTg4OCwwIC02OC4wOTgwOCwtMjcuNjM5MjcgLTY4LjA5ODA4LC02NC4wNjU0OSBsIC0wLjAzMjcsLTQ0LjIyOTI3IFYgNTUwLjY3Mzg5IEggNDg2LjUyNjMgdiAtNTYuMTk2NjIgbCA5Ny40NzQ5MiwwLjQ1OTA0IDMwLjQ5MTY4LDAuMDY1NiBjIDM2LjQ5MTY1LDAgNjguMDk4MDgsMjcuNjA2MzggNjguMDk4MDgsNjQuMDY1MyBWIDY3MC4yNDcwOSBIIDU3Ny43NzE3NyB2IDAgMCB6IG0gODkuOTY2NzQsLTI5LjgyMzk3IGMgMCwtMjQuMjIwMzEgMCwtODEuMzU1OTEgMCwtODEuMzU1OTEgMCwtMjcuMTgwMDQgLTIzLjgzNTg4LC00OS4yMTI4MyAtNTMuMjQ1NiwtNDkuMjEyODMgaCAtMzAuNTI0NDQgdiAtMC4wNjU2IGwgLTgyLjU1Njk2LC0wLjM2MDc0IHYgMjYuMzkzMzYgYyAwLDAgMy4zMTU4OSwwIDkuMjQ4MDIsMCA2LjI3ODYzLDAgMTMuODMzNzUsNS45MDAzIDEzLjgzMzc1LDE0LjU1ODc5IGwgMC4wNjU2LDU1Ljc2ODg3IGMgMCwyNy4xODAwNSAyMy44MzU5OSw0OS4yMTI4MSA1My4yMTI4OSw0OS4yMTI4MSBoIDcyLjUzMTQ2IGMgOS4yOTg1NywwIDE3LjQzNTI3LC01Ljg4ODcyIDE3LjQzNTI3LC0xNC45Mzg3NiB6IgogICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjY2NzY2NjY2MiCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
                    superviserId: 0
                },

            ]
        };
    }

    state : IState;
    render() {
        const id = +this.props.match.params.id;
        const user = this.state.profileList[id];
        let superviser = null;
        if (user.superviserId !== null){
            superviser = this.state.profileList[user.superviserId];
        }
        if (id) {

            return (
                <div>
                    <ProfileDetail user={user} linked={superviser} />

                </div>
            );
        } else {
            return (
                <div>
                    <div>Error Will Robinson</div>
                    <Link to='/'>Goto Home</Link>
                </div>
            )
        }
    }
}
