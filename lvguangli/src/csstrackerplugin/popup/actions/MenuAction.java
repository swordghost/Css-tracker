package csstrackerplugin.popup.actions;

import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.TreeSelection;
import org.eclipse.jface.text.TextSelection;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.internal.ui.packageview.PackageFragmentRootContainer;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
//import org.eclipse.ui.part.FileEditorInput;
import csstrackerplugin.views.RowText;



public class MenuAction implements IObjectActionDelegate {

	private Shell shell;
	private IWorkbenchPart targetPart;  
	
	/**
	 * Constructor for Action1.
	 */
	public MenuAction() {
		super();
	}

	/**
	 * @see IObjectActionDelegate#setActivePart(IAction, IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		shell = targetPart.getSite().getShell();
        this.targetPart = targetPart;
	}

	/**
	 * @see IActionDelegate#run(IAction)
	 */
	public void run(IAction action) { 
        ISelection selection = targetPart.getSite().getSelectionProvider()  
                .getSelection();  
        if ((selection instanceof TextSelection)) {  
        	tracker(selection);
        } 
        else if (selection instanceof TreeSelection) {
        	builder(selection);
        }
        
	}

	/**
	 * @see IActionDelegate#selectionChanged(IAction, ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
	}

	
	void tracker(ISelection selection) {
//		String title = targetPart.getTitle();
		getCurrentProject(selection);
        TextSelection textSelection = (TextSelection) selection; 
        String text = textSelection.getText();  
        if (text == null || text.length() == 0) {  
            return;  
        }   
        int startLine = textSelection.getStartLine(); 
        int length = textSelection.getLength();
        int offset = textSelection.getOffset();   
        IEditorPart editor = (IEditorPart) targetPart;
        IEditorInput input = editor.getEditorInput();
        String path = input.toString().split("\\(|\\)")[1];
        MessageDialog.openInformation(
				shell,"CssTrackerPlugin","path:"+path);
//        TrackerResults trackerResults = new TrackerResults();
        try {
        	PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage().showView("csstrackerplugin.views.RowText");
			RowText rowText = (RowText) PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage().findView("csstrackerplugin.views.RowText");
			String data = "aaa:AAA\nbbb:BBB\nccc:CCC\n";
			rowText.showResult(data,shell);
			
		} catch (PartInitException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	void builder(ISelection selection) { 
		IProject project = getCurrentProject(selection);
		String path =  Platform.getLocation().toString() + project.getFullPath().toString();
		MessageDialog.openInformation(shell,"CssTrackerPlugin",path);
	}
	
	public IProject getCurrentProject(ISelection selection){       
        IProject project = null;    
        if(selection instanceof IStructuredSelection) {    
            Object element = ((IStructuredSelection)selection).getFirstElement();
            if (element instanceof IResource) {    
                project= ((IResource)element).getProject();    
            } else if (element instanceof PackageFragmentRootContainer) {    
                IJavaProject jProject =     
                    ((PackageFragmentRootContainer)element).getJavaProject();    
                project = jProject.getProject();    
            } else if (element instanceof IJavaElement) {    
                IJavaProject jProject= ((IJavaElement)element).getJavaProject();    
                project = jProject.getProject();    
            }    
        }     
        return project;    
    }  
}
