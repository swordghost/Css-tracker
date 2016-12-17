package csstrackerplugin.popup.actions;

import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

public class MenuAction implements IObjectActionDelegate {

	private Shell shell;
	private String selected;
	private String[] menuActions = {"builder","tracker"};
//	private String menuAction;
	
	/**
	 * Constructor for Action1.
	 */
	public MenuAction() {
		super();
		selected = "";
	}

	/**
	 * @see IObjectActionDelegate#setActivePart(IAction, IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		selected = "";
		shell = targetPart.getSite().getShell();
	}

	/**
	 * @see IActionDelegate#run(IAction)
	 */
	public void run(IAction action) {
		String actionName = action.getText();
		if (menuActions[0].equals(actionName)) {
			
		}
		else if (menuActions[1].equals(actionName)) {
			
		}
//		MessageDialog.openInformation(
//			shell,
//			"CssTrackerPlugin",
//			"New Action was executed." + selected + "\n" +  action.getText());
	}

	/**
	 * @see IActionDelegate#selectionChanged(IAction, ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		
		if (selection.isEmpty()) {
			selected = "";
		}
		else {
			selected = selection.toString();
		}
	}

}
