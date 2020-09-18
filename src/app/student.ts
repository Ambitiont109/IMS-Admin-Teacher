export class Student{
  id: number
  name: string
  email: string
  phonenumber: string
  mailAddress: string
  isContracted: string
  reason: string
  staffName: string
  isEngaged: string
  isgrduateWJA: string
  graduateWJA: string
  sponsorName: string

  // High School Info
  isAttendHighSchool: string
  typeOfHighSchool: string
  isReceivedAid: string
  isGraduated: string
  highschool_name: string
  highschool_location: string

  // CollegeInfo

  isAttendCollege: string
  typeOfCollege: string
  isReceivedScholarship: string
  isGraduatedCollege: string
  fieldOfStudy: string
  nameOfCollege: string
  locationOfCollege: string

  // Military Info
  isEnlistMilitary: string
  branchOfMilitary: string

  // Employment Info
  isEmployed: string
  nameOfCompany: string
  jobTitle: string
  created_at: string
  updated_at: string
  constructor(item = {}){
    Object.assign(this,item);
  }
  public getContactInfo(){
    var data=[
      {key:'name',title:'Name',value:this.name},
      {key:'email',title:'Email', value:this.email},
      {key:'phonenumber',title:'PhoneNumber',value:this.phonenumber},
      {key:'mailAddress',title:'Mailing Address', value:this.mailAddress},
      {key:'isContracted',title:'Has the student been contracted?',value:this.isContracted},
      {key:'reason',title:'Reason for contacing the student',value:this.reason},
      {key:'staffName',title:'Staff Member\'s name who contacted student',value:this.staffName},
      {key:'isEngaged',title:'Has the student been engaged?',value:this.isEngaged},
      {key:'isgrduateWJA',title:'Did the student graduate WJA?',value:this.isgrduateWJA},
      {key:'graduateWJA',title:'What year did the student graduate WJA',value:this.graduateWJA},
      {key:'sponsorName',title:'Sponsor\'s Name',value:this.sponsorName},  
    ]
    return data;
  }
  public getHighSchoolInfo(){
    var data=[
      {key:'isAttendHighSchool',title:'Did the student attend high school',value:this.isAttendHighSchool},
      {key:'typeOfHighSchool',title:'What type of high school did the student attend',value:this.typeOfHighSchool},
      {key:'isReceivedAid',title:'Did the student receive aid for high school?',value:this.isReceivedAid},
      {key:'isGraduated',title:'Did the student graduate high school?',value:this.isGraduated},
      {key:'highschool_name',title:'Name of high school student attended',value:this.highschool_name},
      {key:'highschool_location',title:'Where is the high school located?',value:this.highschool_location},
    ]
    return data;
  }
  public getCollegeInfo(){
    let data=[
      {key:'isAttendCollege',title:'Did that sutdent attend college?',value:this.isAttendCollege},
      {key:'typeOfCollege',title:'What type of college did the student attend?',value:this.typeOfCollege},
      {key:'isReceivedScholarship',title:'Did the student receive scholarships?',value:this.isReceivedScholarship},
      {key:'isGraduatedCollege',title:'Did the student graduate college?',value:this.isGraduatedCollege},
      {key:'fieldOfStudy',title:'Field of Study',value:this.fieldOfStudy},
      {key:'nameOfCollege',title:'Name of college student attended',value:this.nameOfCollege},
      {key:'locationOfCollege',title:'Where is the college located?',value:this.locationOfCollege},  
    ];
    return data;
  }
  public getMilitaryInfo(){
    let data=[
      {key:'isEnlistMilitary',title:'Did the student enlist in the military?',value:this.isEnlistMilitary},
      {key:'branchOfMilitary',title:'Which branch of the military?',value:this.branchOfMilitary},  
    ]
    return data;
  }
  public getEmploymentInfo(){
    let data=[
      {key:'isEmployed',title:'Is the student employed?',value:this.isEmployed},
      {key:'nameOfCompany',title:'Name of the company student works for',value:this.nameOfCompany},
      {key:'jobTitle',title:'Job title',value:this.jobTitle},
    ]
    return data;
  }

}