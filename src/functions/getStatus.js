
const getStatus = async (task_id, task_name, poll_sec=1000) => {

    let check_url = `${process.env.P_URL_API}/api/check/${task_id}/${task_name}?external=True`;
    
    
    switch (res.data.task_name) {
        
        case 'tasks.winrm-exec_users':
            let taskStatus = res.data.task_status;
            if (taskStatus === 'SUCCESS') {
                handle_tasks_exec_users(res);
                return false;
            }
            break;
             
    }
    
    setTimeout(function() {
        getStatus(res.data.task_id, res.data.task_name);
    }, poll_sec);
    
}

export default getStatus;