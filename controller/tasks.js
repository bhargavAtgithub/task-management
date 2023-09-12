const getAllTasks = (req, res) => {
    res.status(200).json({message: 'Get todos'})
  }
  
  const createTask = (req, res) => {
    res.status(200).json({message: 'Set todo'})
  }
  
  const updateTask = (req, res) => {
    res.status(200).json({message: `Update todo ${req.params.id}`})
  }
  
  const deleteTask = (req, res) => {
    res.status(200).json({message: `Delete todo ${req.params.id}`})
  }
  
export default {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}