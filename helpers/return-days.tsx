

export const calculateDateDifference = (returnDate: any, issueDate: any) => {
    const newReturnDate=new Date(returnDate).getTime()
    const newIssueDate= new Date(issueDate).getTime();


    const differenceInDays = Math.floor((newReturnDate - newIssueDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
        // Returned on time
        return <span className="badge bg-success d-block">Returned on time</span>;
    } else if (differenceInDays < 0) {
        // Late return
        return <span className="badge bg-danger d-block">{Math.abs(differenceInDays)} days late</span>;
    } else {
        // Days left to return
        return <span className="badge bg-warning d-block">{differenceInDays} days left </span>;
    }

    
};
