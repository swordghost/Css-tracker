package csstrackerplugin.perspectives;

import org.eclipse.ui.IPageLayout;
import org.eclipse.ui.IPerspectiveFactory;

public class TrackerResults implements IPerspectiveFactory {

	private IPageLayout factory;
	public TrackerResults() {
		super();
	}

	public void createInitialLayout(IPageLayout factory) {
		this.factory = factory;
		factory.addView("csstrackerplugin.views.RowText",IPageLayout.BOTTOM, 0.8f,"org.eclipse.ui.editorss");
		factory.setEditorAreaVisible(true);
	}
}
