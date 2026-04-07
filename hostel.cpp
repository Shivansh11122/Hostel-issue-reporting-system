#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

// Complaint structure
struct Complaint {
    int id;
    string studentName;
    string issueType;
    int priority;
};

// Comparator for Priority Queue
struct ComparePriority {
    bool operator()(Complaint a, Complaint b) {
        return a.priority > b.priority; // smaller number = higher priority
    }
};

// Global Priority Queue
priority_queue<Complaint, vector<Complaint>, ComparePriority> complaintQueue;

vector<Complaint> complaintList;

int complaintID = 1;


// Add complaint
void addComplaint() {

    Complaint c;

    c.id = complaintID++;

    cout << "Enter Student Name: ";
    cin >> c.studentName;

    cout << "Select Issue Type\n";
    cout << "1. Electricity\n2. Water\n3. WiFi\n4. Furniture\n5. Cleaning\n";
    int choice;
    cin >> choice;

    switch(choice) {
        case 1: c.issueType="Electricity"; break;
        case 2: c.issueType="Water"; break;
        case 3: c.issueType="WiFi"; break;
        case 4: c.issueType="Furniture"; break;
        case 5: c.issueType="Cleaning"; break;
        default: c.issueType="Other";
    }

    cout << "Enter Priority (1=High,2=Medium,3=Low): ";
    cin >> c.priority;

    complaintQueue.push(c);
    complaintList.push_back(c);

    cout << "\nComplaint Submitted Successfully\n";
}


// Display complaints (priority wise)
void showComplaints() {

    priority_queue<Complaint, vector<Complaint>, ComparePriority> temp = complaintQueue;

    cout << "\nComplaints by Priority\n";

    while(!temp.empty()) {

        Complaint c = temp.top();
        temp.pop();

        cout << "ID: " << c.id
             << " | Student: " << c.studentName
             << " | Issue: " << c.issueType
             << " | Priority: " << c.priority
             << endl;
    }
}


// Sort complaints using Merge Sort idea (STL sort here)
void sortComplaints() {

    sort(complaintList.begin(), complaintList.end(),
    [](Complaint a, Complaint b){
        return a.priority < b.priority;
    });

    cout << "\nSorted Complaints\n";

    for(auto &c : complaintList) {

        cout << "ID: " << c.id
             << " | Issue: " << c.issueType
             << " | Priority: " << c.priority
             << endl;
    }
}


// Staff allocation (simple greedy)
void allocateStaff() {

    if(complaintQueue.empty()) {
        cout << "\nNo complaints available\n";
        return;
    }

    Complaint c = complaintQueue.top();
    complaintQueue.pop();

    cout << "\nAllocating Staff...\n";

    if(c.issueType == "Electricity")
        cout << "Electrician assigned\n";

    else if(c.issueType == "Water")
        cout << "Plumber assigned\n";

    else if(c.issueType == "WiFi")
        cout << "Network Technician assigned\n";

    else if(c.issueType == "Furniture")
        cout << "Carpenter assigned\n";

    else if(c.issueType == "Cleaning")
        cout << "Cleaning Staff assigned\n";

    cout << "Complaint ID " << c.id << " is being resolved\n";
}


// Menu
int main() {

    int choice;

    while(true) {

        cout << "\nHOSTEL ISSUE REPORTING SYSTEM\n";
        cout << "1. Submit Complaint\n";
        cout << "2. Show Complaints\n";
        cout << "3. Sort Complaints\n";
        cout << "4. Allocate Staff\n";
        cout << "5. Exit\n";

        cout << "Enter choice: ";
        cin >> choice;

        switch(choice) {

            case 1: addComplaint(); break;
            case 2: showComplaints(); break;
            case 3: sortComplaints(); break;
            case 4: allocateStaff(); break;
            case 5: return 0;
            default: cout << "Invalid choice\n";
        }

    }
}