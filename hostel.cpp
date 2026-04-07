#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>

using namespace std;

// Complaint structure
struct Complaint{
    int id;
    string studentName;
    string block;
    int room;
    string issueType;
    int priority;
    string status;
    string staff;
};

// Staff structure
struct Staff{
    string name;
    string skill;
    bool available;
};

// Priority Queue Comparator
struct ComparePriority{
    bool operator()(Complaint a, Complaint b){
        return a.priority > b.priority; // High priority first
    }
};

priority_queue<Complaint, vector<Complaint>, ComparePriority> complaintQueue;
vector<Complaint> complaintList;

vector<Staff> staffList = {
    {"Raj","Electricity",true},
    {"Amit","Water",true},
    {"Suresh","WiFi",true},
    {"Ravi","Furniture",true},
    {"Deepak","Cleaning",true}
};

int complaintID = 1;


// Submit Complaint
void submitComplaint(){

    Complaint c;

    c.id = complaintID++;

    cout<<"Enter Student Name: ";
    cin>>c.studentName;

    cout<<"Enter Block (A-G): ";
    cin>>c.block;

    cout<<"Enter Room Number (1-100): ";
    cin>>c.room;

    cout<<"Select Issue\n";
    cout<<"1 Electricity\n2 Water\n3 WiFi\n4 Furniture\n5 Cleaning\n";

    int choice;
    cin>>choice;

    switch(choice){
        case 1: c.issueType="Electricity"; break;
        case 2: c.issueType="Water"; break;
        case 3: c.issueType="WiFi"; break;
        case 4: c.issueType="Furniture"; break;
        case 5: c.issueType="Cleaning"; break;
        default: c.issueType="Other";
    }

    cout<<"Enter Priority (1 High / 2 Medium / 3 Low): ";
    cin>>c.priority;

    c.status="Pending";
    c.staff="None";

    complaintQueue.push(c);
    complaintList.push_back(c);

    cout<<"\nComplaint Submitted Successfully\n";
}


// Display Complaints
void showComplaints(){

    if(complaintList.empty()){
        cout<<"No complaints found\n";
        return;
    }

    cout<<"\nAll Complaints\n";

    for(auto &c:complaintList){

        cout<<"ID:"<<c.id
            <<" | Student:"<<c.studentName
            <<" | Block:"<<c.block
            <<" | Room:"<<c.room
            <<" | Issue:"<<c.issueType
            <<" | Priority:"<<c.priority
            <<" | Status:"<<c.status
            <<" | Staff:"<<c.staff
            <<endl;
    }
}


// Sort Complaints (Merge Sort idea)
void sortComplaints(){

    sort(complaintList.begin(),complaintList.end(),
    [](Complaint a, Complaint b){
        return a.priority<b.priority;
    });

    cout<<"\nComplaints Sorted by Priority\n";

    for(auto &c:complaintList){

        cout<<"ID:"<<c.id
            <<" | Issue:"<<c.issueType
            <<" | Priority:"<<c.priority
            <<endl;
    }
}


// Allocate Staff
void allocateStaff(){

    if(complaintQueue.empty()){
        cout<<"No complaints in queue\n";
        return;
    }

    Complaint c = complaintQueue.top();
    complaintQueue.pop();

    cout<<"\nAllocating Staff for Complaint ID "<<c.id<<"\n";

    for(auto &s:staffList){

        if(s.skill==c.issueType && s.available){

            s.available=false;

            for(auto &comp:complaintList){
                if(comp.id==c.id){
                    comp.staff=s.name;
                    comp.status="In Progress";
                }
            }

            cout<<"Staff "<<s.name<<" assigned\n";
            return;
        }
    }

    cout<<"No staff available currently\n";
}


// Update Complaint Status
void updateStatus(){

    int id;
    cout<<"Enter Complaint ID: ";
    cin>>id;

    for(auto &c:complaintList){

        if(c.id==id){

            cout<<"1 Pending\n2 In Progress\n3 Solved\n";
            int s;
            cin>>s;

            if(s==1) c.status="Pending";
            if(s==2) c.status="In Progress";
            if(s==3){
                c.status="Solved";

                for(auto &staff:staffList){
                    if(staff.name==c.staff){
                        staff.available=true;
                    }
                }
            }

            cout<<"Status Updated\n";
            return;
        }
    }

    cout<<"Complaint not found\n";
}


// Delete Complaint
void deleteComplaint(){

    int id;
    cout<<"Enter Complaint ID to delete: ";
    cin>>id;

    complaintList.erase(
        remove_if(complaintList.begin(),complaintList.end(),
        [id](Complaint c){return c.id==id;}),

        complaintList.end()
    );

    cout<<"Complaint Deleted\n";
}


// Show Staff
void showStaff(){

    cout<<"\nMaintenance Staff\n";

    for(auto &s:staffList){

        cout<<"Name:"<<s.name
            <<" | Skill:"<<s.skill
            <<" | Status:"<<(s.available?"Available":"Busy")
            <<endl;
    }
}


// Main Menu
int main(){

    int choice;

    while(true){

        cout<<"\nHOSTEL ISSUE REPORTING SYSTEM\n";
        cout<<"1 Submit Complaint\n";
        cout<<"2 Show Complaints\n";
        cout<<"3 Sort Complaints\n";
        cout<<"4 Allocate Staff\n";
        cout<<"5 Update Complaint Status\n";
        cout<<"6 Delete Complaint\n";
        cout<<"7 Show Staff\n";
        cout<<"8 Exit\n";

        cout<<"Enter choice: ";
        cin>>choice;

        switch(choice){

            case 1: submitComplaint(); break;
            case 2: showComplaints(); break;
            case 3: sortComplaints(); break;
            case 4: allocateStaff(); break;
            case 5: updateStatus(); break;
            case 6: deleteComplaint(); break;
            case 7: showStaff(); break;
            case 8: return 0;
            default: cout<<"Invalid choice\n";
        }
    }
}
